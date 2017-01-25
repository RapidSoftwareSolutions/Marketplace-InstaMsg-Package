const Q        = require('q');
const fs       = require('fs');
const lib      = require('../lib');
const path     = require('path');
const spawn    = require('child_process').spawnSync;
const request  = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        accessToken,
        tenantId,
        clientId,
        filename,
        file
    } = req.body.args;
        
    let required = lib.parseReq({accessToken, tenantId, clientId, filename, file});

    if(required.length > 0) 
        throw new Object({
            status_code: 'REQUIRED_FIELDS', 
            status_msg:  'Please, check and fill in required fields.',
            fields: required
        });

    let headers = {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'text/plain'
    };

    let attach = spawn(process.execPath, [require.resolve('../lib/download.js'), file]);

    if(!attach.stderr.toString()) {
        let response = JSON.parse(attach.stdout.toString());
        var fn       = path.resolve('./lib', response.message);
        var upload   = fs.readFileSync(fn);

        headers['Content-Length']  = response.length;
    } else {
        console.log(attach.stderr.toString())
        throw new Object({
            status_code: 'INTERNAL_PACKAGE_ERROR', 
            status_msg:  'Something went wrong inside the package. Please, call support.'
        });
    }

    request({
        uri: `https://api.instamsg.io/api/v1/tenants/${tenantId}/clients/${clientId}/files/${filename}`,
        method: 'POST',
        headers: headers
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode))  
            defered.resolve(lib.safeParse(reslut));
        else 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));

        fs.unlink(fn, () => {});
    })
    .form()
    .append('uploadedfile', upload, {filename});


    return defered.promise;
}
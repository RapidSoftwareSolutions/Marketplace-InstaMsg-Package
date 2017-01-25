const Q       = require('q');
const lib     = require('../lib');
const request = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        accessToken,
        tenantId,
        clientId,
        id,
        type,
        topic,
        payload,
        qos,
        duplicate=1,
        save=1
    } = req.body.args;
        
    let required = lib.parseReq({accessToken, tenantId, clientId, type, payload, topic, qos, id});

    if(required.length > 0) 
        throw new Object({
            status_code: 'REQUIRED_FIELDS', 
            status_msg:  'Please, check and fill in required fields.',
            fields: required
        });
    
    request({
        uri: `https://api.instamsg.io/api/v1/tenants/${tenantId}/clients/${clientId}/messages`,
        method: 'POST',
        headers: {
            'User-Agent': 'rapidapi',
            'Authorization': 'Bearer ' + accessToken
        },
        json: lib.clearArgs({
            id,
            type,
            topic,
            payload,
            qos,
            duplicate,
            save
        })  
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode))  
            defered.resolve(lib.safeParse(reslut));
        else 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));
    });

    return defered.promise;    
}
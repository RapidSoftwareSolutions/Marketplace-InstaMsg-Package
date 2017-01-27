"use strict";
global.PACKAGE_NAME = 'InstaMsg';

const express       = require('express'),
    bodyParser      = require('body-parser'),
    RAPI            = require('rapi-js-package'),
    fs              = require('fs'),
    lib             = require('./lib'),
    _               = lib.callback;

const PORT          = process.env.PORT || 8080;
const API           = lib.init();
const app           = express();

let mfile = fs.readFileSync('./metadata.json', 'utf-8'),
    cfile = fs.readFileSync('./control.json',  'utf-8');

let metadata = JSON.parse(mfile),
    control  = JSON.parse(cfile);

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, (req, res) => { res.send(metadata); });

for(let func in control) {
    let options = {
        query:     {},
        hasSkip:   true,
        parseUri:  true,
        debug:     false
    };

    let {
        method, 
        args,
        url,
        hasTree
    } = control[func];

    app.post(`/api/${PACKAGE_NAME}/${func}`, _(function* (req, res) {
        let opts = {};
        let r    = {
            callback     : "",
            contextWrites: {}
        };

        req.body.args = lib.clearArgs(req.body.args);

        try {
            for(let arg in args) {
                let argarr = arg.split('|');
                opts[args[arg] + '|' + argarr[0]] = req.body.args[argarr[1]];
            }

            method == 'GET' ? options.query = opts : options.body = opts;
            options.method  = method;
            options.hasTree = hasTree;

            let result = yield new RAPI(url).auth({
                type: 'bearer',
                token: req.body.args['accessToken']
            }).request(options);

            console.log(result)

            r.callback            = 'success';
            r.contextWrites['to'] = lib.success(result);
        } catch(e) {
            r.callback            = 'error';
            r.contextWrites['to'] = lib.error(e);
        }

        res.status(200).send(r);
    }));
}

// TODO

for(let route in API) {
    app.post(`/api/${PACKAGE_NAME}/${route}`, _(function* (req, res) {
        let response;
        let r = {
            callback     : "",
            contextWrites: {}
        };

        try {
            response              = yield API[route](req, res);
            r.callback            = 'success';
            r.contextWrites['to'] = lib.success(response);
        } catch(e) {
            r.callback            = 'error';
            r.contextWrites['to'] = lib.error(e);

        }
        res.status(200).send(r);
    }));
}


app.listen(PORT);
module.exports = app;

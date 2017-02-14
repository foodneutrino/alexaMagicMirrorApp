var buffers = require("./keys/buffers");

var config = {};

// AWS IoT
config.aws = {};
config.aws.magicmirror = {
    //"keyPath": buffers.privateKey,
    //"certPath": buffers.certificate,
    //"caPath": buffers.rootCA,
    "keyPath": __dirname+'/keys/MagicMirror.private.key',
    "certPath": __dirname+'/keys/MagicMirror.cert.pem',
    "caPath": __dirname+'/keys/root-CA.crt',
    "host": "a92x04d9sswpf.iot.us-east-1.amazonaws.com",
    "port": 8883,
    "clientId": "DML-AlexaMagicMirror",
    "region":"us-east-1",
    "debug":true
};

module.exports = config;

var config = {};

// AWS IoT
config.aws = {};

config.aws.magicmirror = {
    "keyPath": __dirname+'/keys/MagicMirrorImages.private.key',
    "certPath": __dirname+'/keys/MagicMirrorImages.cert.pem',
    "caPath": __dirname+'/keys/root-CA.crt',
    "host": "a92x04d9sswpf.iot.us-east-1.amazonaws.com",
    "port": 8883,
    "clientId": "MagicMirrorImages",
    //"clientId": "arn:aws:iot:us-east-1:775547642661:thing/MagicMirrorImages",
    "region": "us-east-1",
    "debug": true
};

module.exports = config;

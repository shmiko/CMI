// Sets the MongoDB Database options
// Invoke 'strict' JavaScript mode
'use strict';

// Load the correct configuration file according to the 'NODE_ENV' variable
// module.exports = require('./environment/' + process.env.NODE_ENV + '.js');
// emitter.setMaxListeners(15);
module.exports = {

    mongolab:
    {
        name: "calmapit-mongolab-ec2",
        url1: "mongodb://tripstomp:waxnepke@ds031641.mongolab.com:31641/calmapit",
        port: 27017
    },
    aws:
    {
        name: "aws-ec2",
        url: 'mongo ec2-52-64-219-249.ap-southeast-2.compute.amazonaws.com',
        url1: 'mongodb://@52.64.219.249:27017/calmapit'
    },
    local:
    {
        name: "calmapit-local",
        url : 'mongodb://localhost/calmapit',
        port: 27017
    },

    localtest:
    {
        name: "calmapit-test-local",
        url: "mongodb://localhost/calmapit-test",
        port: 27017
    }

};

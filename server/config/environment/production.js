'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/meanApp-auth'
  },
  // db: 'mongodb://localhost/mean-production',
  // sessionSecret: 'productionSessionSecret',
  // facebook: {
  //   clientID: 'Facebook Application ID',
  //   clientSecret: 'Facebook Application Secret',
  //   callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  // },
  // twitter: {
  //   clientID: 'Twitter Application ID',
  //   clientSecret: 'Twitter Application Secret',
  //   callbackURL: 'http://localhost:3000/oauth/twitter/callback'
  // },
  // google: {
  //   clientID: 'Google Application ID',
  //   clientSecret: 'Google Application Secret',
  //   callbackURL: 'http://localhost:3000/oauth/google/callback'
  // }
};
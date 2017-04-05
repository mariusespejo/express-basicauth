const regeneratorRuntime = require("regenerator-runtime");
var basicAuth = require('basic-auth');

module.exports = function (options = { username: 'username', password: 'password' }) {
  return async function (req, res, next) {
    const { username, password } = options;
    let { authenticator } = options;
    var credentials = basicAuth(req);
    let authenticated;

    async function basicAuthenticator(name, pass, username, password) {
      return username === name && password === pass;
    }

    if (!authenticator) authenticator = basicAuthenticator;

    try {
      authenticated = await authenticator(credentials.name, credentials.pass, username, password);
    } catch (err) {
      console.error('Could not authenticate:', err);
    }

    if (!authenticated) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    next();
  };
};
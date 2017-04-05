var basicAuth = require('basic-auth');

async function authenticator(name, pass, username, password) {
  return username === name && password === pass;
}

module.exports = function (options = { username: 'username', password: 'password', authenticator }) {
  return async function (req, res, next) {
    const { username, password, authenticator } = options;
    var credentials = basicAuth(req);
    let authenticated;

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
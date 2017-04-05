var test = require('tape');
var basicAuth = require('.');

function base64Encode(str) {
    return Buffer.from(str, 'utf8').toString('base64');
}

function setAuthHeader(username, password) {
    return 'Basic ' + base64Encode(username + ':' + password);
}


test('it should authenticate using basic authentication', function (assert) {
    const middleware = basicAuth();
    let req = {headers: {}}, res = {};
    req.headers.authorization = setAuthHeader('username', 'password');

    middleware(req, res, () => {
        assert.end();      
    })
});

test('it should fail to authenticate if user/pass is wrong', function (assert) {
    const middleware = basicAuth();
    let req = {headers: {}};
    req.headers.authorization = setAuthHeader('username', 'wrongpassword');
    let res = {
        set: () => {}, 
        sendStatus: (status) => {
            assert.equal(status, 401, 'Responds with 401 status code');
            assert.end();      
        }
    };

    middleware(req, res, () => {});
});
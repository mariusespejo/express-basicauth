# express-basicauth 

[![Build Status](https://travis-ci.org/mariusespejo/express-basicauth.svg?branch=master)](https://travis-ci.org/mariusespejo/express-basicauth)

A simple express middleware for basic authentication

## How to install

Install with npm:

```shell
npm install --save express-basicauth
```

## How to use with Express

### This will authenticate if username entered is 'username' and password entered is 'password'.

```javascript
var express = require('express');
var basicAuth = require('express-basicauth');
var app = express();


app.use(basicAuth());
```

### Using a custom username and password:

```javascript
var express = require('express');
var basicAuth = require('express-basicauth');
var app = express();


app.use(basicAuth({username: 'name', password: 'pass' }));
```

### You can also optionally provide your own custom athenticator. 


```javascript
var express = require('express');
var basicAuth = require('express-basicauth');
var app = express();

/**
 * All you need is a function which returns a promise that is resolved once authenticated.
 * You can also use async functions for this 
 */
function myCustomAuthenticator(username, password) {
    let authenticated = false;

    // add authentication logic 

    return authenticated ? Promise.resolve() : Promise.reject();
}

app.use(basicAuth({authenticator: myCustomAuthenticator}));
```


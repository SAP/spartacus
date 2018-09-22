'use strict';
const url = require('url');

module.exports = (req, res, next) => {
  const uri = url.parse(req.url, true);
  if (uri.pathname === '/authorization') {
    authorizeUser(req, res);
  }
  next();
};

const users = [
  {
    username: 'john@loco.com',
    password: 'Test2018!'
  }
];

function authorizeUser(req, res) {
  const {
    body: { username, password }
  } = req;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    res.send(
      JSON.stringify({
        access_token: 'xxxYYYxxx',
        token_type: 'bearer',
        refresh_token: 'xxxXXXxxx',
        expires_in: 1000,
        scope: ['xxx'],
        userId: 'xxx'
      })
    );
  } else {
    res.send(401);
  }
}

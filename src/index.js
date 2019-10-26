const express  = require('express');
const jwt      = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRSA   = require('jwks-rsa');

const app = express();

const checkJWT = jwt({
    secret: jwksRSA.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-112l54tu.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'grazzrootzcommunity',
    issuer: 'https://dev-112l54tu.eu.auth0.com/',
    algorithms: ['RS256']
})


const checkDiaryAuth = jwtAuthz(['read:diary']);
const checkCalendarAuth = jwtAuthz(['read:calendar']);

app.get('*', checkJWT, checkDiaryAuth, (_, res) => {
    return res.send('Hey!');
});

app.listen(3000);

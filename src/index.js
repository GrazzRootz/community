const express                            = require('express');
const jwt                                = require('express-jwt');
const jwtAuthz                           = require('express-jwt-authz');
const jwksRSA                            = require('jwks-rsa');
const cors                               = require('cors')
const { allEvents, appendEvents, event } = require('./events');

const app = express();

const checkJWT = jwt({
    secret: jwksRSA.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-112l54tu.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'grazzrootzgarden',
    issuer: 'https://dev-112l54tu.eu.auth0.com/',
    algorithms: ['RS256']
})


const checkEventAuth = jwtAuthz(['write:calendar']);

app.use(cors());
app.use(express.json());

app.get('/event', checkJWT, (_, res) => {
    return allEvents().then((x) => {
        return res.json(x);
    });
});

app.post('/event', checkJWT, checkEventAuth, (req, res) => {
    if (!req.body) {
        return res.status(400).send('Bad Request');
    } else {

        const {
            title,
            user,
            date,
            desc,
            garden
        } = req.body;

        return appendEvents([
            event({
                title,
                user,
                date,
                desc,
                garden
            })
        ]).then(() => {
            return res.status(200).send('success');
        }).catch(err => {
            return res.status(500).send(err.message);
        });
    }
});


app.listen(4000);

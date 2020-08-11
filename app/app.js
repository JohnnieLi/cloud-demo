require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let compression = require('compression');
let RateLimit = require('express-rate-limit');
let helmet = require('helmet');

// =======================
// configuration
// =======================
let cors = require('./config/cors');//get Cross-Origin Resource Sharing (CORS) config
app.use(helmet());
app.enable('trust proxy');
app.use(compression());
app.use(cors);// set CORS
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//API Router
let apiLimiter = new RateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000,
    delayMs: 0, // disabled
    message: "Too many request from same IP, please try again later"
});

const api = require('./api.v1/index');
// only apply to requests that begin with /api.v1/
app.use('/v1', apiLimiter, api);

app.use(express.static(path.join(__dirname, '../public')));

//set swagger path
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Send all other requests to the 404
app.get('*', (req, res) => {
    return res.status(404).json({error: 404, message: 'can not found path'});
});

module.exports = app;
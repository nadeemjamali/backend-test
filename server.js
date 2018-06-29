require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const {
    HttpError
} = require('./models/errors');

const server = express();

//configure server
server.use(helmet());
server.use(compression());
server.use(bodyParser.json({
    limit: '2mb'
}));
server.use((req, resp, next) => {
    resp.contentType('application/json');
    next();
});

//import APIs
const {
    usersApi
} = require('./api/v1/users');

//integrate APIs
server.use('/api/v1/users', usersApi);

//catch 404
server.use((req, resp, next) => {

    // in production, log the following error through some loggers like Winston
    console.log(`404 response on ${req.method}: ${req.url}`);
    return resp.status(404).json({
        message: 'Resource not found!'
    });
});

server.use((err, req, resp, next) => {

    if (process.env.NODE_ENV != 'production') {
        // in production, log the following error through some loggers like Winston
        console.error(err);
    }

    //for all errors that are thrown manually
    if (err instanceof HttpError) {
        return resp.status(err.statusCode).json({
            message: err.message
        });
    }

    //for all errors other errors
    return resp.status(500).json({
        message: 'Internal server error!'
    });
});

server.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`server is up and listening at port ${process.env.PORT}`);
});
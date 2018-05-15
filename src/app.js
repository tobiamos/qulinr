require('dotenv').config({
    path: '.env'
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const morgan = require('morgan');
const {
    sendJSONResponse
} = require('./helpers');
require('./models');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '52428800'
}));
const apiRoutes = require('./routes');
app.use('/api/v1', apiRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line
    if (err.isBoom) {
        const {
            message
        } = err.data[0];
        sendJSONResponse(res, err.output.statusCode, { data:null, message});
    } else if (err.status === 404) {
        sendJSONResponse(res, err.status, {  data:null, message: 'Not Found'});
    } else {
        sendJSONResponse(res, 500, { data:null, message: 'Something went wrong'});
    }
});

app.listen(config.port, () => console.log('APP RUNNING ON ', config.port));

module.exports = {
    app
};

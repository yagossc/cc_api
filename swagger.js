const swaggerui = require('swagger-ui-express');
const swaggerdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'eye_api',
            version: '1.0.0',
            description: 'An example credit card transaction based API.',
        },
        basePath: '/',
    },
    apis: ['./index.js']
}

const specs = swaggerdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerui.serve, swaggerui.setup(specs));
}

const winston = require('winston');
const express_winston = require('express-winston');

const myformat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;

});

module.exports.setup_logger = function() { // FIXME: do a proper logger module
    return express_winston.logger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'api.log', // This would be rotated.
                level:    'info',
            })

        ],
        format: winston.format.combine(
            winston.format.timestamp(),
            myformat

        ),
        meta:          false,
        expressFormat: true,
    });
}

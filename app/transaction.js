const _ = require("lodash");
const schemas = require("./schemas");

var transaction = function(data) {
    this.data = this.sanitize(data);
}

transaction.data = {};

transaction.prototype.sanitize = function(data) {
    data = data || {};
    schema = schemas.transaction;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = transaction;

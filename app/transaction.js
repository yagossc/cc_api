const _ = require("lodash");
const schemas = require("./schemas");

var transaction = function(data) {
    this.data = this.sanitize(data);
}

transaction.data = {};

/**
   Return only desired/allowed fields
   from data, according to schema.
*/
transaction.prototype.sanitize = function(data) {
    // If data is undefined|null|fase,
    // initialize and empty object for it
    data = data || {};

    // Check schema for fields
    schema = schemas.transaction;

    // Return only desired fields
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = transaction;

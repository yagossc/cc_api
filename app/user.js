// FIXME: this code could e in a single place
// if the schemas were better structured
const _ = require("lodash");
const schemas = require("./schemas");

/**
   Return only desired/allowed fields
   from data, according to schema.
*/
module.exports.sanitize = function(data) {
    // If data is undefined|null|false,
    // initialize and empty object for it
    data = data || {};

    // Check schema for fields
    schema = schemas.user;

    // Return only desired fields
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

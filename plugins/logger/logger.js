// index.js
/*
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
var bunyan = require('bunyan');
module.exports = function setup(options, imports, register) {

    var logger = bunyan.createLogger(options.config);
    logger.serializers = bunyan.stdSerializers;

    register(null, {
        "logger": logger
    });
};
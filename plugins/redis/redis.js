var	redis = require('redis');
var logger;
var event;
module.exports = function setup(options, imports, register) {

    logger = imports.logger;
    event = imports.event;
    var config = options.config;

    var client = redis.createClient(config.port, config.host);

    client.logger = logger;
    client.event = event;

    client.on('connect', function() {
        logger.info("redis connection to " + config.host + ":" + config.port + " successful.");
    });

    client.on("error", function(err) {
        logger.error("redis connection to " + config.host + ":" + config.port + " failed.");
        logger.error(err);
    });

//    require("./modules/store.js").init(client);

    register(null, {});
}
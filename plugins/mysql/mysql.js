var mysql = require('mysql');
var logger;
module.exports = function setup(options, imports, register) {
    logger = imports.logger;
    initialize(options.config, function(connection){
        connection.logger = imports.logger;
        connection.event = imports.event;
        require('./modules/store.js').init(connection);
    });

    register(null, {});
};

function initialize(config, callback){
    logger.info ("mysql config: " + JSON.stringify(config));
    var connection = mysql.createConnection(config);
    onDisconnect(connection);
    connection.connect();
    callback(connection);
}

function onDisconnect(connection) {
    connection.on("error", function (error) {
        logger.error("Error on connect to mysql: ", error);
        if (error instanceof Error) {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
                logger.error(error);
                logger.info("Lost connection. Reconnecting...");
                initialize(connection.config, function(con){
                    connection = con;
                });
            } else if (error.fatal) {
                throw error;
            }
        }
    });
}
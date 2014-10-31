var logger;
var event;
var connection;
module.exports.init = function (con) {
    logger = con.logger;
    event = con.event;
    connection = con;

    event.on("stores::list", list);
    event.on("redis::stores::list", list);
    event.on("stores::get", get);
    event.on("stores::update", update);
    event.on("stores::delete", remove);

};

function list(params) {
    var name = params.name;
    var req = params.req;
    var responseEvent = event.responseEventName(params);
    var limit = 20;
    var offset = 0;
    var parameters = [];
    logger.debug("MYSQL - Received request for: " + name);

    if (req && req.query && req.query.limit){
        limit = parseInt(req.query.limit, 10);
    }
    if (req && req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }

    var sql = "SELECT store_id as storeId, store_name as storeName FROM tea_store";

    logger.debug("all stores " + req.query.all);
    if (req && req.query && !req.query.all) {
        sql = sql + " LIMIT ?, ?";
        parameters.push(offset);
        parameters.push(limit);
    }

    logger.debug("query: " + sql);
    logger.debug("parameters: " + JSON.stringify(parameters));
    connection.query(sql, parameters, function (err, result) {
        var reply = {};
        if(err) {
            reply.originalError = err;
            reply.friendlyError = new Error("Failed to retrieve stores list.");
            event.emit(responseEvent, params, reply);
        } else{
            logger.debug("MYSQL - returning store list." + JSON.stringify(result));
            reply.stores = result;
            event.emit(responseEvent, params, null, reply);
        }
    });
}

function get(params) {
    var name = params.name;
    var req = params.req;
    var responseEvent = event.responseEventName(params);
    var limit = 20;
    var offset = 0;
}

function update(params) {
    var name = params.name;
    var req = params.req;
    var responseEvent = event.responseEventName(params);
    var limit = 20;
    var offset = 0;
}

function remove(params) {
    var name = params.name;
    var req = params.req;
    var responseEvent = event.responseEventName(params);
    var limit = 20;
    var offset = 0;
}
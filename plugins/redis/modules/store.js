var client;
var logger;
var event;
module.exports.init = function (cl) {
    client = cl;
    logger = client.logger;
    event = client.event;

    event.on("stores::list", list);
    event.on("stores::create", create);

};

function list(params) {
    var name = params.name;
    logger.debug("REDIS - Received request for: " + name);
    client.get(name, function(err, value){
        var reply = {source:"redis"};
        var responseEvent = event.responseEventName(params);
        if(err){
            logger.debug("REDIS - failed to retrieve store list.");
            reply.error = new Error("Failed to retrieve store list.");
            reply.statusCode = 500;
            event.emit(responseEvent, params, reply);
        }
        if (value) {
            logger.debug("REDIS - returning store list." + JSON.stringify(JSON.parse(value)));
            reply.stores = JSON.parse(value);
            event.emit(responseEvent, params, null, reply);
        } else {
            logger.info("Retrieving store list from DB.");
            fetchListFromDB(params);
        }
    });
}

function fetchListFromDB(params){
    var parameters = {
        name: "redis::" + params.name,
        req: params.req,
        res: params.res,
        next: params.next
    };
    event.publish(parameters, function(par, err, result){
        if (result) {
            logger.info("Received response from DB.");
            logger.debug("Saving into " + params.name + " value = " + JSON.stringify(result.stores));
            client.set(params.name, JSON.stringify(result.stores), function(){
                logger.info("Redis store list updated.");
                event.emit(event.responseEventName(params), params, null, result);
            });
        } else {
            var reply ={
                error: new Error("Failed to retrieve stores list."),
                statusCode: 500
            };
            event.emit(event.responseEventName(params), params, reply);
        }
    });
}

function create(params) {
    var name = params.name;
    var req = params.req;
    var parameters = req.params;
    var store = {
        "id": parameters.id,
        "storeName": parameters.storeName
    };
    logger.debug("REDIS - Received request for: " + name);
    client.setnx(name + "::" + parameters.id, store, function(err, value){
        var reply = {};
        var responseEvent = event.responseEventName(params);
        if(err){
            logger.debug("REDIS - failed to retrieve store list.");
            reply.error = new Error("Failed to retrieve store list.");
            reply.statusCode = 500;
            event.emit(responseEvent, params, reply);
        }
        if (value) {
            logger.debug("REDIS - returning store list." + JSON.stringify(JSON.parse(value)));
            reply.stores = JSON.parse(value);
            event.emit(responseEvent, params, null, reply);
        } else {
            logger.info("Retrieving store list from DB.");
            fetchListFromDB(params);
        }
    });
}
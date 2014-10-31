// restify.js
/*
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
var restify = require("restify");
var logger;
var event;
module.exports = function setup(options, imports, register) {
    logger = imports.logger;
    event = imports.event;
    var server = restify.createServer(options.config);
    server.use(restify.bodyParser());
    server.use(restify.queryParser());
    server.use(restify.fullResponse());

    server.publish = publish

    server.pre(init);

    require("./modules/store.js").init(server);
//    require("./modules/customer.js").init(server);
//    require("./modules/customer-order.js").init(server);

    server.listen(options.config.port, function () {
        logger.info('%s listening at %s', server.name, server.url);
    });

    register(null, {});
};

function init (req, res, next) {
    logger.info("START - " + req.method + " " + req.url);
    req.eventToken = event.token();
    logger.debug("params: ", req.params);
    logger.debug("eventToken: ", req.eventToken);
    next();
}


function publish(name, req, res, next){
    logger.debug("Publishing event: " + name);
    var parameters = event.params(name , req, res, next);
    event.publish(parameters, processResult);
}

function processResult(params, err, result){
    var res = params.res;
    if(err){
        logger.error("ERROR - " + params.req.method + " " + params.req.url + " " + JSON.stringify(err.originalError))
        res.send(err.friendlyError);
    } else {
        logger.info("RESULT - " + params.req.method + " " + params.req.url + " " + JSON.stringify(result));
        res.send(result);
    }
    params.next();
}
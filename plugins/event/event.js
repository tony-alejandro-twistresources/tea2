// events.js
/*
 * @options is the hash of options the user passes in when creating an instance
 * of the plugin.
 * @imports is a hash of all services this plugin consumes.
 * @register is the callback to be called when the plugin is done initializing.
 */
var EventEmitter = require('events').EventEmitter;
var crypto = require('crypto');
var config;
var event;
var logger;
module.exports = function setup(options, imports, register) {
    logger = imports.logger;
    event = new EventEmitter();
    config = options.config;

    event.on('newListener', function(e){
       logger.debug("registered new event: " + e);
    });

//    event should implement the functional interface below:
//    event: {
//        "on": registers a listener to an event
//        "once": registers a listener to an event that only triggers once
//        "emit": broadcasts an event so listeners can act on it
//        "token": generates a random token for events
//        "params": wraps parameters into a single JSON object
//        "responseEventName": generates a new event name by concatenating the event name with a token
//        "publish": registers an event with a response handler
//    }

    event.token = random;
    event.params = params;
    event.responseEventName = responseEventName;
    event.publish = publish;

    register(null, {
        "event": event
    });


};

function responseEventName(params){
    return params.name + "::callback::" + params.req.eventToken;
}

function params(name, req, res, next){
    return {
        "name":name,
        "req": req,
        "res": res,
        "next": next
    }
}

function random(len){
    if(!len) len = config["tokenLength"];
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0,len);
}

function publish(params, callback){
    var responseEvent = responseEventName(params);
    logger.debug("Creating response event: " + responseEvent);
    event.once(responseEvent, callback);
    logger.info("Broadcasting event: " + params.name);
    if(!event.emit(params.name, params)){
        var err = new Error("No registered listeners for: " + params.name);
        logger.error(err);
        event.removeAllListeners(responseEvent);
        callback(err);
    }
}
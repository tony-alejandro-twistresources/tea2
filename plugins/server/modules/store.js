/**

 This module exposes the API for the Store object.

 To create a listener for the events, just use the event module's "on" method.
 Then return a result by emitting an event with the original event's name plus the eventToken.
 e.g.:

event.on("stores::create", function (req, res, next) {
    var result = {
        id: 1,
        name: "metrosix",
        token: "234sdfe123"
    };
    // req.eventToken is automatically generated for each request
    // the result may be an error object
    event.emit("stores::create::" + req.eventToken, result);
    next();
});

*/

var publish;
module.exports.init = function (server) {

    publish = server.publish;
    server.get("/stores", list);
    server.get("/stores/:id", get);
    server.post("/stores", create);
    server.post("/stores/:id", update);
    server.put("/stores/:id", update);
    server.del("/stores/:id", remove);

};

function list(req, res, next) {
    publish("stores::list", req, res, next);
}

function get(req, res, next) {
    publish("stores::get", req, res, next);
}

function create(req, res, next) {
    publish("stores::create", req, res, next);
}

function update(req, res, next) {
    publish("stores::update", req, res, next);
}

function remove(req, res, next) {
    publish("stores::remove", req, res, next);
}
var logger;
module.exports.init = function(server){
    logger = server.log;
    server.get("/users/:userId/privileges", list);
    server.get("/users/:userId/privileges/:orderId", get);
    server.post("/users/:userId/privileges", create);
    server.put("/users/:userId/privileges/:orderId", update);
    server.del("/users/:userId/privileges/:orderId", remove);

};

function list(req, res, next){
    logger.info("user-privilege.list() - START");
    res.send("list");
    next();
}

function get(req, res, next){
    logger.info("user-privilege.get() - START");
    res.send("get");
    next();
}

function create(req, res, next){
    logger.info("user-privilege.create() - START");
    res.send("create");
    next();
}

function update(req, res, next){
    logger.info("user-privilege.update() - START");
    res.send("update");
    next();
}

function remove(req, res, next){
    logger.info("user-privilege.remove() - START");
    res.send("remove");
    next();
}


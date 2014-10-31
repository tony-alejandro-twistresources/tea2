var logger;
module.exports.init = function(server){
    logger = server.log;
    server.get("/customers", list);
    server.get("/customers/:id", get);
    server.post("/customers", create);
    server.put("/customers/:id", update);
    server.del("/customers/:id", remove);

};

function list(req, res, next){
    logger.info("customer.list() - START");
    res.send("list");
    next();
}

function get(req, res, next){
    logger.info("customer.get() - START");
    res.send("get");
    next();
}

function create(req, res, next){
    logger.info("customer.create() - START");
    res.send("create");
    next();
}

function update(req, res, next){
    logger.info("customer.update() - START");
    res.send("update");
    next();
}

function remove(req, res, next){
    logger.info("customer.remove() - START");
    res.send("remove");
    next();
}


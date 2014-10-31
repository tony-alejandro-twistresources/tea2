var logger;
module.exports.init = function(server){
    logger = server.log;
    server.get("/customers/:customerId/orders", list);
    server.get("/customers/:customerId/orders/:orderId", get);
    server.post("/customers/:customerId/orders", create);
    server.put("/customers/:customerId/orders/:orderId", update);
    server.del("/customers/:customerId/orders/:orderId", remove);

};

function list(req, res, next){
    logger.info("customer-order.list() - START");
    res.send("list");
    next();
}

function get(req, res, next){
    logger.info("customer-order.get() - START");
    res.send("get");
    next();
}

function create(req, res, next){
    logger.info("customer-order.create() - START");
    res.send("create");
    next();
}

function update(req, res, next){
    logger.info("customer-order.update() - START");
    res.send("update");
    next();
}

function remove(req, res, next){
    logger.info("customer-order.remove() - START");
    res.send("remove");
    next();
}


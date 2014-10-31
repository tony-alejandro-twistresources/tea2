/**
 * Configuration settings for each imported plugin.
 * packagePath is required while all other properties are arbitrary.
 */

module.exports = [

    {
        "packagePath": "./plugins/event",
        "config": require("./plugins/event/config.js")
    },

    {
        "packagePath": "./plugins/logger",
        "config": require("./plugins/logger/config.js")
    },

    {
        "packagePath": "./plugins/mysql",
        "config": require("./plugins/mysql/config.js")
    },

//    {
//        "packagePath": "./plugins/openerp",
//        "config": "./plugins/openerp/config.js"
//    },

    {
        "packagePath": "./plugins/redis",
        "config": require("./plugins/redis/config.js")
    },

//    {
//        "packagePath": "./plugins/solr",
//        "config": "./plugins/solr/config.js"
//    },

    {
        "packagePath": "./plugins/server",
        "config": require("./plugins/server/config.js")
    }

];
// index.js
var architect = require('architect');
var config = architect.loadConfig(require("path").join(__dirname, 'config.js'));
architect.createApp(config, function (err, app) {
    if (err) throw err;
    app.services["logger"].info("TEA successfully initialized.")
});
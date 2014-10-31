/*sample config*/
var errorlog = require("path").join(__dirname, "../../logs/tea-errors.log");
module.exports = {
    "name": "TEA",
    "streams": [
        {
            "level": "info",
            "stream": process.stdout            // log INFO and above to stdout
        },
        {
            "type": "rotating-file",
            "level": "error",
            "path": errorlog,  // log ERROR and above to a file
            "period": "1d",                       // daily rotation
            "count": 3                            // keep 3 back copies
        }
    ]
};
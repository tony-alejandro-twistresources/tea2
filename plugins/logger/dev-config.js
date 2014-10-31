/*sample config*/
var debuglog = require("path").join(__dirname, "../../logs/tea-debug.log");
module.exports = {
    "name": "TEA",
    "src": true,
    "streams": [
        {
            "level": "debug",
            "stream": process.stdout   // log debug and above to stdout
        },
        {
            "type": "rotating-file",
            "level": "debug",
            "path": debuglog,          // log DEBUG and above to a file
            "period": "1d",            // daily rotation
            "count": 3                 // keep 3 back copies
        }
    ]
};
var ip = require('ip');

const CONSTANTS = {
    IP: `http://${ip.address()}:3000`
}

module.exports = {CONSTANTS}
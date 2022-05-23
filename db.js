const Pool = require("pg").Pool;

const pool = new Pool({
    user: "am2510",
    host:"pgserver.mau.se",
    database: "am2510",
    password: "zyvl0ir7",
    port: 5432,
})
module.exports = pool;
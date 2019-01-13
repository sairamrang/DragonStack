const databaseConfiguration = require('./secrets/databaseConfiguration');
const { Pool } = require ('pg');

const pool = new Pool (databaseConfiguration);

module.exports = pool;

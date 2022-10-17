const { options } = require('../../options/sqliteDB.js');
const knex = require("knex")(options);

async function tableMsjes () {
    try {
        await knex.schema.createTable('messages', table => {
            table.increments('id').primary();
            table.string('email');
            table.timestamp("date");
            table.string("msg", 300);
        });
        console.log('Table created');
    } catch (err) {
        console.log(err);
    }
}

module.exports = tableMsjes;
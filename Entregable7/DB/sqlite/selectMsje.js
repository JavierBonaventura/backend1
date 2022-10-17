const { options} = require('../../options/sqliteDB.js');
const knex = require('knex')(options);

async function selectMsje() {
    try {
        const msg = await knex('messages').select('*');
        console.log(msg);
        return msg;
    } catch (err) {
        console.log(err);
    }
}

module.exports = selectMsje;
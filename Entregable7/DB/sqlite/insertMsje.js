const {options} = require('../../options/sqliteDB.js');
const knex = require('knex')(options);

async function insertMsje(msje) {
    try {
        await knex('messages').insert(msje);
        console.log('Message inserted');
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = insertMsje;
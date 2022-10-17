const { options } = require('../../options/mariaDB.js');
const knex = require('knex')(options);

async function insertProducts(product) {
    try {
        await knex('products').insert(product);
        console.log('Product inserted');
    } catch (err) {
        console.log(err);
    }
}

module.exports = insertProducts;
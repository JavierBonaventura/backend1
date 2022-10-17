const { options } = require('../../options/mariaDB.js');
const knex = require('knex')(options);

async function selectProducts() {
    try {
        const productsList = await knex.select('*').from('products');
        return productsList;
    } catch (err) {
        console.log(err);
    }
}

module.exports = selectProducts;
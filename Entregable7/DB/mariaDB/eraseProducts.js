const { options } = require('../../options/mariaDB.js');
const knex = require('knex')(options);

async function eraseProducts(product) {
    try {
        await knex('products').where('id', product.id).delete();
        console.log('Product erased');
    } catch (err) {
        console.log(err);
    }
}

module.exports = eraseProducts;
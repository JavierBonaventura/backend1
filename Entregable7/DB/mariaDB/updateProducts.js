const { options } = require('../../options/mariaDB.js');
const knex = require('knex')(options);

async function updateProducts(product) {
    try {
        await knex('products').where('id', product.id).update(product);
        console.log('Product updated');
    } catch (err) {
        console.log(err);
    }
}

module.exports = updateProducts;
const { options } = require('../../options/mariaDB.js');
const knex = require("knex")(options);

async function createTableProducts() {
    try {
        await knex.schema.createTable("products", table => {
            table.increments("id");
            table.string("name");
            table.string("description");
            table.string("image");
            table.integer("price");
            table.integer("quantity");
        });
        console.log("Table products created");
    } catch (err) {
        console.log(err);
    }
}

module.exports = createTableProducts;
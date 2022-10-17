const options = {
    client: "sqlite3",
    connection: {
        filename: "../DB/sqlite/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

module.exports = { options };

const knex = require('knex');

class Container {
    constructor(config, tableName) {
        this.config = config;
        this.tableName = tableName;
        this.knex = knex(this.config);
    }
    save = obj => {
        this.knex(this.tableName).insert(obj)
            .then(() => console.log('Producto guardado'))
            .catch(err => { console.log(err); throw err })
            .finally(() => this.knex.destroy())
    }

    getAll = async () => {
        try {
            let objs = await this.knex.from(this.tableName).select('*')
            return objs;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    
}

module.exports = Container;

import mongoose from 'mongoose';
const SchemaMongoose = mongoose.Schema;
const userSchemaMongoose = new SchemaMongoose({  
    email: { type: String, required: true }
});

const messageSchemaMongoose = new SchemaMongoose({
    user: { type: Object, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});


import normalizr from 'normalizr';
const { schema } = normalizr;
const userSchemaNormalizr = new schema.Entity('users', {}, { idAttribute: 'email' });
const messageSchemaNormalizr = new schema.Entity('messages', {user: userSchemaNormalizr})


export {
    userSchemaMongoose,
    messageSchemaMongoose,
    messageSchemaNormalizr,
    userSchemaNormalizr
}


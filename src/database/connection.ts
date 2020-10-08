import knex from 'knex';
import path from 'path';

//This is the connection variable, it will connect to my database at localhost,
//but we can set it to connect to any database
const db=knex({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',
        password:'123456',
        database:'websystem',
        port:3308,
    },
    useNullAsDefault:true,
});

export default db;
import knex from 'knex';
import path from 'path';

//This is the connection variable, it will connect to my database at localhost,
//but we can set it to connect to any database
const db=knex({
    client:'mysql',
    connection:{
        host:'cloud.smartinova.com.br',
        user:'root',
        password:'mgtrda',
        database:'websystem',
        port:3306,
    },
    useNullAsDefault:true,
});

export default db;
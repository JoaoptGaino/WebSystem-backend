import path from 'path';

module.exports={
    client:'mysql',
    connection:{
        host:'cloud.smartinova.com.br',
        user:'root',
        password:'mgtrda',
        database:'websystem',
        port:3306,
    },
    migrations:{
        directory: path.resolve(__dirname,'src','database','migrations')
    },
    useNullAsDefault:true,
}
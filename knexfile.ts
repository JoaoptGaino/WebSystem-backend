import path from 'path';

module.exports={
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',
        password:'123456',
        database:'websystem',
        port:3308,
    },
    migrations:{
        directory: path.resolve(__dirname,'src','database','migrations')
    },
    useNullAsDefault:true,
}
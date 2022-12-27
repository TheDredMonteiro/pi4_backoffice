const postgres = require('pg').Pool;

const conexaoBaseDados = new postgres({
    user: 'eokrlvyj',
    host: '89.181.218.32',
    database: 'eokrlvyj',
    password: 'QOan984gvgYwYHIpn5zL8kKqcb3WV2zA',
    port: ''
});

try {
    conexaoBaseDados.connect();
    console.log("Base de dados conectada com sucesso!");
} catch (erro) {
    console.log(`Erro ao conectar a base de dados! \n Erro: ${erro}`);
}

module.exports = { conexaoBaseDados };
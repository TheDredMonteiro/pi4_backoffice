var { Pontos_interesse, Regioes, Tipos_pontos_interesse , Utilizadores} = require('../model/tabelas')
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');
const oneTimePassword = require('../service/oneTimePassword');
const sequelize = require('../model/db');
const { Op } = require("sequelize");
const { StatusCodes } = require('http-status-codes');
const { conexaoBaseDados } = require('../../config/database');
const { emailEnviado, compareCodigo } = require('../service/oneTimePassword');
//import OTP from '../service/oneTimePassword'
module.exports = {

    list: async (req, res) => {
        // para filtrar por estado
        const filtro = req.query.filtro ?? 'id'
        const ordem = req.query.ordem ?? 'ASC'

        await sequelize.sync()
            .then(async () => {

                const data = await Regioes.findAll({
                   
                    
                    include: [
                        {model: Utilizadores}
                    ],
                    order: [
                        [filtro, ordem]
                    ]
                })
                    .then(function (data) {
                        return data;
                    })
                    .catch(error => {
                        return error;
                    });
                res.json({ success: true, data: data });
            })
    },
    add: async (req, res) => {
        if (
            !req.body.regiao ||
            !req.body.id_utilizador ||
            !req.body.fotografia_1
        ) {
            res.status(400).json({
                success: false,
                message: 'Faltam dados! É preciso regiao, id_utilizador e fotografia_1.'
            })
            return
        }

        const regiao = req.body.regiao
        const id_utilizador = req.body.id_utilizador
        const fotografia_1 = req.body.fotografia_1

        await sequelize.sync()
            .then(async () => {
                await Regioes
                    .create({
                        regiao: regiao,
                        id_utilizador: id_utilizador,
                        fotografia_1: fotografia_1
                    },)
                    .then(() => res.status(200).json({ success: true, message: "Região criada" }))
                    .catch(error => { res.status(400); throw new Error(error); });
            })
    },
}


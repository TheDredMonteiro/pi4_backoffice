const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt')

// ######################################################
// ################### DEFINIÇÕES #######################
// ######################################################
const Utilizador_Roles = sequelize.define('utilizador_roles', {
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Tipos_pontos_interesse = sequelize.define('tipos_pontos_interesse', {
    tipo_ponto_interesse: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Utilizadores = sequelize.define('utilizadores', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO nome não pode estar vazio.\x1b[0m'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO email não pode estar vazio.\x1b[0m'
            },
            isEmail: {
                args: true,
                msg: '\x1b[31mO email inserido não é válido.\x1b[0m'
            }
        }
    },
    nif: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pontos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mOs pontos não podem estar vazios.\x1b[0m'
            }
        }
    },
    fotografia: {
        type: DataTypes.STRING,
        allowNull: true
        
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: '\x1b[31mO estado não pode estar vazio.\x1b[0m'
            }
        }
    },
    data_ativacao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    data_desativacao: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Pontos_interesse = sequelize.define('pontos_interesse', {
    ponto_interesse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fotografia_1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotografia_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotografia_3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qrcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pontos: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Lugar = sequelize.define('lugar', {
    
}, {
    freezeTableName: true,
    timestamps: false
})

const Reservas = sequelize.define('reservas', {
    num_vagas: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    presenca: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    data_reserva: {
        type: DataTypes.DATE,
        allowNull: true
    },
    data_anulacao_reserva: {
        type: DataTypes.DATE,
        allowNull: true
    },
    data_visita: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Visitas = sequelize.define('visitas', {
    data_visita: {
        type: DataTypes.DATE,
        allowNull: false
    },
    vagas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    N_reservas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Recompensas = sequelize.define('recompensas', {
    recompensa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    num_pontos: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    validade: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const Regioes = sequelize.define('regioes', {
    tipo_ponto_interesse: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Pontos_interesse.hasMany(Lugar, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Lugar.belongsTo(Pontos_interesse, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Reservas.hasMany(Lugar, {
    foreignKey: {
        name: 'id_reserva',
        allowNull: false
    }
})
Lugar.belongsTo(Reservas, {
    foreignKey: {
        name: 'id_reserva',
        allowNull: false
    }
})

const Leitura_QR = sequelize.define('leitura_qr', {
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    }
    
}, {
    freezeTableName: true,
    timestamps: false
})
Utilizadores.hasMany(Leitura_QR, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Leitura_QR.belongsTo(Utilizadores, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Pontos_interesse.hasMany(Leitura_QR, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Leitura_QR.belongsTo(Pontos_interesse, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Reservas.hasMany(Leitura_QR, {
    foreignKey: {
        name: 'id_reserva',
        allowNull: false
    }
})
Leitura_QR.belongsTo(Reservas, {
    foreignKey: {
        name: 'id_reserva',
        allowNull: false
    }
})

Utilizadores.hasMany(Reservas, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Reservas.belongsTo(Utilizadores, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Visitas.hasMany(Reservas, {
    foreignKey: {
        name: 'id_visita',
        allowNull: false
    }
})
Reservas.belongsTo(Visitas, {
    foreignKey: {
        name: 'id_visita',
        allowNull: false
    }
})

const Vouchers = sequelize.define('vouchers', {
    qrcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_emissao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    data_validade: {
        type: DataTypes.DATE,
        allowNull: true
    },
    data_remissao: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Utilizadores.hasMany(Vouchers, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Vouchers.belongsTo(Utilizadores, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})

Recompensas.hasMany(Vouchers, {
    foreignKey: {
        name: 'id_recompensa',
        allowNull: false
    }
})
Vouchers.belongsTo(Recompensas, {
    foreignKey: {
        name: 'id_recompensa',
        allowNull: false
    }
})


Utilizadores.hasMany(Recompensas, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Recompensas.belongsTo(Utilizadores, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})

Pontos_interesse.hasMany(Visitas, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Visitas.belongsTo(Pontos_interesse, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})

const Favoritos = sequelize.define('favoritos', {
}, {
    freezeTableName: true,
    timestamps: false
})

Pontos_interesse.hasMany(Favoritos, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Favoritos.belongsTo(Pontos_interesse, {
    foreignKey: {
        name: 'id_ponto_interesse',
        allowNull: false
    }
})
Utilizadores.hasMany(Favoritos, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})
Favoritos.belongsTo(Utilizadores, {
    foreignKey: {
        name: 'id_utilizador',
        allowNull: false
    }
})



Regioes.hasMany(Pontos_interesse, {
    foreignKey: {
        name: 'id_regiao',
        allowNull: false
    }
})
Pontos_interesse.belongsTo(Regioes, {
    foreignKey: {
        name: 'id_regiao',
        allowNull: false
    }
})

Tipos_pontos_interesse.hasMany(Pontos_interesse, {
    foreignKey: {
        name: 'id_tipo_ponto_interesse',
        allowNull: false
    }
})
Pontos_interesse.belongsTo(Tipos_pontos_interesse, {
    foreignKey: {
        name: 'id_tipo_ponto_interesse',
        allowNull: false
    }
})

const Landing_Page = sequelize.define('landing_page', {

    hero_titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hero_descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hero_imagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body_titulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    body_descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotografia_1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotografia_2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fotografia_3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagem_android: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    
    freezeTableName: true,
    timestamps: false
})





Utilizador_Roles.hasMany(Utilizadores, {
    foreignKey: {
        name: 'id_role',
        allowNull: false
    }
})
Utilizadores.belongsTo(Utilizador_Roles, {
    foreignKey: {
        name: 'id_role',
        allowNull: false
    }
})

// a visita só precisa do id do form associado e da data de criação


module.exports = {
    Lugar,
    Leitura_QR,
    Vouchers,
    Reservas,
    Recompensas,
    Visitas,
    Favoritos,
    Pontos_interesse,
    Regioes,
    Tipos_pontos_interesse,
    Landing_Page,
    Utilizador_Roles,
    Utilizadores
}
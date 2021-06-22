const conexao = require("./conexao")

const Clientes = conexao.sequelize.define("cliente",{
	nome:{
		type: conexao.Sequelize.STRING
	},
	idade:{
		type: conexao.Sequelize.INTEGER
	}	
})

module.exports=Clientes

const express = require("express")
const app = express();
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const Clientes = require("./models/clientes")

//configurações
	app.engine("handlebars",handlebars({defaultLayout:'main'}))
	app.set('view engine','handlebars')
	app.use(bodyParser.urlencoded({extended:false}))
	app.use(bodyParser.json())
//rotas
app.get("/", async function(req, res) {
	let temp= await Clientes.findAll({ raw: true });
	res.render('mostrar',{info:temp})
});

app.get("/inserir", function(req, res) {
  res.render("inserir");
});

app.post("/inserirform", function(req, res) {
	Clientes.create({
	  nome: req.body.nome,
	  idade: req.body.idade,
  }).then(function(){
	  res.redirect('/')
	}
  ).catch(function(erro){
	  res.send("Erro: "+erro)
	}
  )
});

app.get("/excluir/:id", function(req, res) {
  Clientes.destroy({where:{'id':req.params.id}}).then(function(){
	  res.redirect('/')
	}
  ).catch(function(erro){
	  res.send("Erro: "+erro)
	}
  ) 
});

app.get("/alterar/:id", async function(req, res) {
  const temp = await Clientes.findOne({ where: { id: req.params.id } });
  if (temp !== null) {
    res.render('alterar',{info:temp.get({ plain: true })})
  }
});

app.post("/alterarform", function(req, res) {
	Clientes.update({ nome: req.body.nome,	idade: req.body.idade
		},{where: { id: req.body.id }
	}).then(function(){  res.redirect('/') }
  ).catch(function(erro){
	  res.send("Erro: "+erro)
	}
  )
});

//iniciar o app
app.listen(8081,function(){
	console.log("Iniciou o servidor localhost:8081")
	}
);

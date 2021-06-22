const express=require("express")
const app=express();

app.get("/alunos/:nome/:sobrenome",function(req,res){
    res.send(req.params);
  }
);
app.listen(8081);


var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database

mongoose.connect('mongodb://test:test@ds151068.mlab.com:51068/todo321');

//Create a schemea - this is like a blueprint

var todoSchema =  new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item:'get milk'},{item:'walk dog'},{item:'code'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data})});
    });


  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });


  });

  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });


  });
}

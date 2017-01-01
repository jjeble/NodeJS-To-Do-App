var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database

mongoose.connect('mongodb://test:test@ds151068.mlab.com:51068/todo321');

//Create a schemea - this is like a blueprint

var todoSchema =  new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item:'buy flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});

var data = [{item:'get milk'},{item:'walk dog'},{item:'code'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
  app.get('/todo',function(req,res){
    res.render('todo',{todos:data})});

  app.post('/todo',urlencodedParser,function(req,res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item',function(req,res){
    data = data.filter(function(todo)
    {
      return todo.item.replace(/ /g,'-')!== req.params.item;
    });
    res.json(data);

  });
};

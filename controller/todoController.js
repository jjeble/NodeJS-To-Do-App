var data = [{item:'get milk'},{item:'walk dog'},{item:'code'}];

module.exports = function(app){
  app.get('/todo',function(req,res){
    res.render('todo',{todos:data})});

  app.post('/todo',function(req,res){

  });

  app.delete('/todo',function(req,res){

  });
};

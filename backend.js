var express= require("express");
var fs=require("fs");
var bp= require("body-parser");
var app= express();
var port=3000;


var mon=require("mongoose");
var mongodb= require("mongodb");
var MongoClient= mongodb.MongoClient;
var url="mongodb://localhost:27017/";



//serves the main login page to the user
app.get('/', function(req,res){
var html= fs.readFileSync(__dirname+"/login.html");
res.write(html);
});

//serves the css of the login page
app.get('/logincss.css', function(req,res){
    res.sendFile(__dirname+"/logincss.css");
    });

//serves the css of the signup page
app.get('/signincss.css', function(req,res){
    res.sendFile(__dirname+"/signincss.css");
    });

//serves the css page of the signup portal
app.get('/signin.html', function(req,res){
    var html= fs.readFileSync(__dirname+"/signin.html");
    res.write(html);
});

//post request of signup page
app.use(bp.urlencoded({extended : true}));
app.post('/signinn',function(req,res){

    MongoClient.connect(url,function(error,databases){  
        if(error){  
            throw error;  
      
        }  
        var dbase=databases.db("person");  
        var custcoll=dbase.collection("info");

        
        //inserting data in database person.info
        custcoll.insertOne({name: req.body.name, password: req.body.password , todos:[""]}, function(error, response) {  
            if (error) {  
                throw error;  
            }  
        });
        
        databases.close();  
        
    });  

    //res.send(req.body.name+" "+req.body.password);
});


//post request of the login page
app.use(bp.urlencoded({extended : true}));
app.post('/loginn',function(req,res){
    var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
  if (err) throw err

  var db = client.db('person')

  db.collection('info').find({name : req.body.name, password:req.body.password+""}).toArray(function (err, result) {
    if (err) throw err
    if(result.length===0)res.send("CREATE NEW ACCOUNT THEN LOGIN");
    else
    {
        var http=fs.readFileSync(__dirname+"/todo.html");
        res.write(http);
    }
  });
});

    
});

app.listen(port);
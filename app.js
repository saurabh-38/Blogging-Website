const express=require('express');
const https = require("https");
const date=require(__dirname+"/modules/date.js")
const app=express();



app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

var items=[];
var workitems=[];

app.get("/",(req,res)=>{
                
        var day=date.getDay();
      
        res.render("list",{listTitle: day,newListItem: items});

})
app.post("/",(req,res)=>{
        
        var item=req.body.newItem;
        if(req.body.button=="work"){
                workitems.push(item);
                res.redirect("/work");
        }else{
                
items.push(item);
res.redirect("/");
        }



})

app.get("/about",(req,res)=>{
        res.render("about")
})

app.get("/work",(req,res)=>{
        
        var today=new Date();
        var option={
                weekend: "long",
                day: "numeric",
                month: "long"
        };
        
        var day=today.toLocaleDateString("en-us",option)
        res.render("list",{listTitle: "work title",newListItem: workitems});
})


app.post("/work",(req,res)=>{


        var item=req.body.newItem;

        console.log(item);
        workitems.push(item);
                res.redirect("/work");
        

})


app.listen(5000);

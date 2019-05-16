var express = require('express');
var router = express.Router();

var path = require('path');


router.get("/", function(req, res){
    res.render('main');
});

router.post("/", function(req, res){
    console.log("wompwomp: " + req.body.taskInput);
    res.send("received req");
})

/*router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '/public/main.html'));
});*/ //This is the way to serve a file to a URL

router.get('*', function(req, res){
    res.send("Sorry the requested URL does not exist.");
}); //This has to be placed at the end 


module.exports = router; /*This is referring to the variable and has nothing to do
                           with the class name. LEl */
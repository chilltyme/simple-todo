var express = require('express');
var router = express.Router();


router.get('/ret', function(req, res, next){
    console.log("Request received here");
    next();
});

router.get('/ret', function(req, res){
    res.send("this is sending somewhere!");
});

router.get('*', function(req, res){
    res.send("Sorry the requested URL does not exist.");
}); //This has to be placed at the end 


module.exports = router; /*This is referring to the variable and has nothing to do
                           with the class name. LEl */
var fs = require('fs');
var mime = require('mime');
var express = require('express');
var app = express();
const mimetypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg'
};

var routes = require('./router.js');

app.use("/", routes);




app.listen(1337);



/*
* Old Node code below prior to Express
*
*
*var filePath = './main.html';
http.createServer(function(req, res){
    console.log("Jesus!");
    
    fs.readFile(filePath, function(err, data){
        res.writeHead(200, {'Content-type': 'text/html'});   
        res.write(data);
        res.end();
    });

    if(req.url.indexOf('.js') != -1){
        fs.readFile('./scripts.js', function(err, data){
            if(err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }

    if(req.url.indexOf('.css') != -1){
        fs.readFile('./css_anim.css', function(err, data){
            if(err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }

}).listen(8080);*/
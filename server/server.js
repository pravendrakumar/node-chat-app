const express = require('express');
var app = express();
const path = require('path');

const  publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));
console.log(publicPath);










app.listen(8081,()=>{
    console.log("server started app at localhost:8081");
})
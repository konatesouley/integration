"use stri   ct";

const express= require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/nom/:name', function(request, response){
    response.send('bienvenue'+request.params.name);
})


app.listen(PORT, function(){
    console.log('Hello :'+ PORT);
})
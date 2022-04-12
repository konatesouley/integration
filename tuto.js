const express = require("express");
const app = express();
const port = 3000;

//const fs = require('fs')
//let fichier = fs.readFileSync('./solidarite.json')
//let point_recolte = JSON.parse(fichier)
//console.log(personne)
let recolte = require('./solidarite.json')
//console.log(recolte)

// la racine de l'api
app.get('/', function (request, response) {
    response.send('Bonjour, vous êtes à la racine de ce serveur ! pour voir la liste des point de distribution de nourriture, allez voir /recolte')
  })

// parse json
//var jsonParsed = JSON.parse(jsonData);
 
// access elements
//console.log(jsonParsed.persons[0].name);

app.get('/products', function(request, response){
    const products = [
        {
          id: 1,
          name: "hammer",
        },
        {
          id: 2,
          name: "screwdriver",
        },
        ,
        {
          id: 3,
          name: "wrench",
        },
      ];
   
     response.json(products);
})

app.get('/products/:id', function(request, response){
    response.send('bienvenue'+request.params.name);
})

app.get('/recolte', function(request, response){
    
     response.json(recolte);
})

app.listen(port, function(){
    console.log('Hello :'+ port);
})
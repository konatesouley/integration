"use stri   ct";
const { response } = require('express');
const express= require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch =require('node-fetch');
//const  axios  =  requiert ( 'axios' ) ;

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
    
    response.json(recolte[0].fields.association);
})


// API
// listes des point de 
//var data = fetch("https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")

// arret de bus en occitanie
//fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10")
//.then(res => res.json())
//.then(res2 =>console.log(res2))

//var data1 = data.json();


app.get('/recolte2', function(request, response){

//var url = "https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC"
  //var data = fetch("https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")
  //console.log(data);
  //data = fetch()
  //let url = "https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10";
        fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10")
        .then(res => res.json())
        .then(json => response.send(json.records[0].fields.nom));
})



app.listen(port, function(){
    console.log('Hello :'+ port);
})
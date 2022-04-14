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
    response.send('Bonjour, vous êtes à la racine de ce serveur ! pour voir la liste des point de distribution de nourriture, allez voir /recolte: pour voir la liste des des associations , /arret: pour voir les arret des bus proches des point de retrait ou /info pour voir des information sur les sans abris');
  })

// parse json
//var jsonParsed = JSON.parse(jsonData);
 
// access elements
//console.log(jsonParsed.persons[0].name);


//https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")


app.get('/recolte', function(request, response){
  var association = [];
  adresse = [];
  telephone = [];
  //resultat = {}
  for (let i = 0; i< recolte.length;i++){
    association.push(recolte[i].fields.association);
  }

  for (let i = 0; i< recolte.length;i++){
    adresse.push(recolte[i].fields.adresse_du_lieu);
  }

  for (let i = 0; i< recolte.length;i++){
    telephone.push(recolte[i].fields.tel_ref);
  }

  resultat = {association,adresse,telephone};
    //recolte[0].fields.association
    response.json(resultat);
})


// API
// listes des point de 
//var data = fetch("https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")

// arret de bus en occitanie
//fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10")
//.then(res => res.json())
//.then(res2 =>console.log(res2))

//var data1 = data.json();


app.get('/arret', function(request, response){

//var url = "https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC"
  //var data = fetch("https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")
  //console.log(data);
  //data = fetch()
  //let url = "https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10";
    fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10")
        .then(res => res.json())
        .then(json => { 
          var arret = [];
          
          for (let i = 0; i< json.records.length;i++){
            arret.push(json.records[i].fields.nom);
            
          }
          //arret[1].fields
          //var arret2 = [];
          //for (let j = 0; j< arret.length;j++){
            //console.log("arret " + j , arret[j]);
            //arret2.push(arret[j].fields);
            
          //}
          response.json(arret);

        });
        //response.send(data);
        //json.records[0].fields.nom
        //response.send(json.records[1].fields.nom));

})

app.get('/info', function(request, response){
  response.send('cette partie est en creation par abdoulaye');
})

app.listen(port, function(){
    console.log('Hello :'+ port);
})
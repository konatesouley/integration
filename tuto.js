"use stri   ct";
const { response } = require('express');
const express= require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch =require('node-fetch');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//https://integrationdonnee.herokuapp.com/arret


// la racine de l'api
app.get('/', function (request, response) {
  response.send('Bonjour, vous êtes à la racine de ce serveur ! pour voir la liste des point de distribution de nourriture, allez voir /recolte: pour voir la liste des des associations , /arret: pour voir les arret des bus proches des point de retrait ou /temporaire pour voir des information sur les sans abris');
})


let recolte = require('./solidarite.json')
//console.log(recolte)

app.get('/temporaire', function(request, response){

const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto("https://www.montpellier.fr/3249-l-hebergement-temporaire.htm");
    
    const movies = await page.evaluate(() => {
        let movies = [];
        let elements = document.querySelectorAll('div.coordonnees');
        for (element of elements) {
          movies.push({
              coordonnes: element.querySelector('p.adresse').textContent,
              tel: element.querySelector('p.telephone').textContent
              
          })
      }
      return movies;
    });
    response.json(movies);
    await browser.close();
    
})();


})



//https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=20&offset=0&lang=fr&timezone=UTC")


app.get('/recolte', function(request, response){
  var association = [];
  adresse = [];
  telephone = [];
  table = [];
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

  for (let i = 0; i< recolte.length;i++){
    table.push({
      nom_association: recolte[i].fields.association,
      adresse_association: recolte[i].fields.adresse_du_lieu,
      tel_association: recolte[i].fields.tel_ref

    });
    
  }
  
  resultat = {association,adresse,telephone};
    //recolte[0].fields.association
    response.json(table);
})


// API
// listes des point de 
//var data = fetch("https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")
// arret de bus en occitanie
//fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10")

app.get('/arret', function(request, response){

//var url = "https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC"
  //var data = fetch("https://data.laregion.fr/api/v2/catalog/datasets/solidarite-alimentaire-en-occitanie/records?limit=45&offset=0&lang=fr&timezone=UTC")
  //console.log(data);
  //data = fetch()
  //let url = "https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=10";
    fetch("https://data.laregion.fr/api/records/1.0/search/?dataset=arrets-de-tramway-de-montpellier-mediterranee-metropole&q=&rows=18")
        .then(res => res.json())
        .then(json => { 
          var arret = [];
          
          for (let i = 0; i< json.records.length;i++){
            arret.push({
              nom_arret:json.records[i].fields.nom,
              coordonnes_arret: json.records[i].fields.geo_shape
            });
            
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





//documentation swagger
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, function(){
    console.log('Hello :'+ port);
})
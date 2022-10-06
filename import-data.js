require('dotenv').config()
// module dotenv = env en mémoire, config() va chercher .env
//console.log(process.env)

const mongoose =  require('mongoose')
const { Schema } = mongoose;

// on connecte a la bdd mongodb on recupere les credentials dans notre fichier .env
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!')
    getFilmingLocationById('2020-404');
}) //autoriser l'adresse IP de chez moi
// .connect() est asynchrone

// on définit le schema mongoose
const filmSchema = new Schema({

    filmType: String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: String,
    geolocation: {
        coordinates: [
            Number
        ],
        type: String
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number,
});

const Location = mongoose.model('Location',filmSchema)

//création du modele locations
//const maPremiereLocation = new Location({filmType:"Horror"})
//maPremiereLocation.save().then()

async function addFilmingLocation(filmList){

    for (const elt of filmList) {
        let film = new Location();
        film.filmType = elt.fields.type_tournage;
        film.filmProducerName = elt.fields.nom_producteur;
        film.endDate = elt.fields.date_fin;
        film.filmName = elt.fields.nom_tournage;
        film.district = elt.fields.ardt_lieu;
        film.coordinates = elt.fields.geo_point_2d;
        film.type = elt.fields.geo_shape.type;
        film.sourceLocationId = elt.fields.id_lieu;
        film.filmDirectorName = elt.fields.nom_realisateur;
        film.address = elt.fields.adresse_lieu;
        film.startDate = elt.fields.date_debut;
        film.year = elt.fields.annee_tournage;
        await film.save()

    }

}
const filmingLocations = require('../secure-web-dev-workshop1/lieux-de-tournage-a-paris.json')
//addFilmingLocation(filmingLocations);

async function getFilmingLocationById(id){
    const query = await Location.findOne({'sourceLocationId':id})
    console.log(query);
}


function getFilmingLocationByFilmName (filmName){
    const query =  Location.findOne({'filmName':filmName});
    return query;
}
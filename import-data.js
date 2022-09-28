require('dotenv').config()
// module dotenv = env en mémoire, config() va chercher .env
//console.log(process.env)

const mongoose =  require('mongoose')
const { Schema } = mongoose;

// on connecte a la bdd mongodb on recupere les credentials dans notre fichier .env
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!')}) //autoriser l'adresse IP de chez moi
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
const maPremiereLocation = new Location({filmType:"Horror"})

function addFilmingLocation(liste){
    let film = new Location();
    film.filmType = liste.fields.type_tournage;
    film.filmProducerName = liste.fields.nom_producteur;
    film.endDate = liste.fields.date_fin;
    film.filmName = liste.fields.nom_tournage;
    film.district = liste.fields.ardt_lieu;
    film.geolocation.coordinates = liste.fields.geo_shape.coordinates;
    film.geolocation.type = liste.fields.geo_shape.type;
    film.sourceLocationId = liste.fields.id_lieu;
    film.filmDirectorName = liste.fields.nom_realisateur;
    film.address = liste.fields.adresse_lieu;
    film.startDate = liste.fields.date_debut;
    film.year = liste.fields.annee_tournage;

}
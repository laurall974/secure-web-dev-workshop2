require('dotenv').config()
// module dotenv = env en mémoire, config() va chercher .env
//console.log(process.env)

const mongoose =  require('mongoose')
const { Schema } = mongoose;

// on connecte a la bdd mongodb on recupere les credentials dans notre fichier .env
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!')
    getFilmingLocationById('2019-1611');
    deleteLocationById('32'); //test : ne marche pas ok
    deleteLocationById('633f19972cd2549596ba3922'); // ok !!
    //addLocation('Horror','Laura MONGO','2018','Laura le retour','75020','2019-456','Roch Moreau','ESILV','2018-11-23');
    updateLocation('634d83c853fde20788d76a3d', 'filmName','Laura is back')
})

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

//const maPremiereLocation = new Location({filmType:"Horror"})
//maPremiereLocation.save().then()
/** Question 9 :
 * Write a function to query one Location by its ID
 */
async function getFilmingLocationById(id){
    const query = await Location.findOne({'sourceLocationId':id})
    console.log(query);
}

// on teste les fonctions plus haut dans le haut donnect pour par avoir de problème
// si la fonction s'éxécute alors que la ocnnexion n'est pas encore établie

/**Question 10 :
 * Write a function to query all Locations for a given filmName
 */
function getFilmingLocationByFilmName (filmName){
    const query =  Location.findOne({'filmName':filmName});
    return query;
}

/**Question 11 :
 * Write a function to delete a Location by its ID
 */
async function deleteLocationById(id){
    try {
        const query = await Location.deleteOne({'_id':id})
        console.log(query);
    } catch (error) {
        //console.error(error);
        console.error('ID does not exist');
    }

}

/** Question 12:
 * Write a function to add a Location
 */
function addLocation(filmType, filmProducerName,endDate,filmName, district, sourceLocationId,filmDirectorName,address,startDate,year){
    const maPremiereLocation = new Location({filmType:filmType, filmProducerName:filmProducerName,endDate:endDate,filmName:filmName,district:district,sourceLocationId:sourceLocationId,filmDirectorName:filmDirectorName,address:address,startDate:startDate,year:year})
    maPremiereLocation.save().then()
    console.log('Location created');
}

/** Question 13 :
 * Write a function to update a Location
 */

async function updateLocation(id, option, newValue){
    const loc = await Location.findById(id)
    loc[option] = newValue;
    await loc.save();

}

/** FINISH */
require('dotenv').config()
// module dotenv = env en mémoire, config() va chercher .env
//console.log(process.env)

//import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!')
    console.log('Toto')}) // promesse sur JS
// .connect() est asynchrone

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
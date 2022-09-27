require('dotenv').config()

import mongoose from 'mongoose';

const { Schema } = mongoose;
const location = new Schema({

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
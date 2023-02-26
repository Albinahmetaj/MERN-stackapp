const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    reps:{
        type: Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    isActive:{
        type: Boolean,
        required:true
    },
    proteinBrands: [{ name: Array, whey: Number }]
    
}, {timestamps:true})

const Workoutbrands = new Schema({
    brands: [{ name: Array}]
    
}, {timestamps:true})

module.exports = mongoose.model('Workout', workoutSchema )

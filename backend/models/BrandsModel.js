const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Workoutbrands = new Schema({
    brands: [{ name: Array}]
    
}, {timestamps:true})

module.exports = mongoose.model('Brands', Workoutbrands )
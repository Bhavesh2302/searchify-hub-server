const mongoose = require('mongoose')

const watchSchema = mongoose.Schema({
    name:{type: String, required:true},
    image:{type: String, required: true},
    brand:{type: String, required:true},
    category:{type: String, required: true},
    price:{type: Number, required:true},
    rating:{type:Number, required:true},
    suitable_for:{type: String, required:true}
})


const Watch = mongoose.model("watches",watchSchema)

module.exports = {
    Watch : Watch
}
var mongoose = require('./db'),
    Schema = mongoose.Schema;

var ExpressSchema = new Schema({
    contact : String,
    phone : String,
    payment : Number,
    due_date : Date,
    location : String,
    pickup_address : String,
    delivery_address : String,
    description : String
})

module.exports = mongoose.model('Express', ExpressSchema);
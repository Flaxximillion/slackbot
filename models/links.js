var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    date: Date,
    name: String,
    instructions: String,
    starter: String,
    solution: String
});

module.exports = mongoose.model('Link', LinkSchema);
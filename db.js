const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/criminaldb', { useNewUrlParser : true });

const crimSchema = new mongoose.Schema({
    name : String,
    district : String,
    salary : Number,
    prior_record : String,
    education : String,
    img : Buffer
});

var Crim = mongoose.model('Crim', crimSchema);
module.exports.Crim = Crim;

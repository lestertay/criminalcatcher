const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/criminaldb', { useNewUrlParser : true });

const crimSchema = new mongoose.Schema({
    img : Buffer
});

var Crim = mongoose.model('Crim', crimSchema);
module.exports.Crim = Crim;

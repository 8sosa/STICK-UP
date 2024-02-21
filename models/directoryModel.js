const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
  name: 
    { 
        type: String, 
        required: true 
    },
    user_id:
    {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Directories', directorySchema);
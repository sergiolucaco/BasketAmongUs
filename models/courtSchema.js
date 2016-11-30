// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a court Schema. This will be the basis of how user data is stored in the db
var courtSchema = new Schema({
    courtname: {type: String, required: true},
    address: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat] // // courtSchema.index({location: '2dsphere'});//Did it in the shell.It can be also in the schema of mongoose.
    tipology: {type: String, required : true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
courtSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "basketcourtsample"
module.exports = mongoose.model('basketcourt', courtSchema);
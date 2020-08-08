// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let MessageSchema = Schema({
    body: String,
    isPalindrome: Boolean,
    status: {type: String, default: 'Active'},
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now}
});

MessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("message", MessageSchema);
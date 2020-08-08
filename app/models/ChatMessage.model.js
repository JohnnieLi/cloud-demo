// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
let Counter = require('./Counter.model');

let ChatMessageSchema = Schema({
    id: Number,
    body: String,
    read: Boolean,
    status: {type: String, default: 'Active'},
    fromUser: Number,
    toUser: Number,
    createdAt: {type: Date, default: Date.now},
    modifiedAt: {type: Date, default: Date.now}
});



//create increment id
ChatMessageSchema.pre('save',  function(next) {
    let doc = this;
    Counter.findOneAndUpdate({item: 'chatMessage'}, {$inc: {sequence_value: 1}}, {new: true, upsert: true})
        .then(function (count) {
            doc.id = count.sequence_value;
            next();
        }).catch(function (error) {
        throw error;
    });
});

ChatMessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("chatMessage", ChatMessageSchema);
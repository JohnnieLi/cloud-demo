let Message = require('../models/Message.model');// get our mongoose model
let {isPalindrome} = require('../@core/utils/stringHelper');


module.exports = function () {

    let messageCtl = {};
    
    messageCtl.list = function (req, res) {
        let page = req.query.page;
        let limit = req.query.size;
        if (page && limit) {
            var options = {
                page: page,
                lean: true,
                leanWithId: false,
                limit: limit
            };
            Message.paginate({}, options, (err, result) => {
                if(err){
                    return res.json({error: err});
                }
                return res.json({result: result});
            });
        }else{
            Message.find()
            .exec(function (err, results) {
                if (results) {
                    res.json({result: results});
                } else {
                    res.json({error: err.message, message: err.message});
                }
            });
        }
    },

    messageCtl.retrieve = function (req, res) {
        try {
            let _id = req.params._id || req.body._id;
            Message.findOne({_id: _id}, function (err, result) {
                if(err){
                    return res.json({error: err});
                }else{
                    return res.json({result: result});
                }
            });
        } catch (e) {
            return res.json({error: e});
        }
    },

    
    messageCtl.create = function (req, res) {
        let messageBody = req.body;
        if(!messageBody.body){
            return res.status(400).json({error: 400, message: 'missing body params'});
        }
        let message = new Message();
        message.body = messageBody.body;
        message.isPalindrome = isPalindrome(message.body);
        message.save(function (err, result) {
            if (err) {
                return res.json({error: err, message: err});
            } else {
                return res.json({result: result});
            }
        })
    };


    messageCtl.update = function (req, res) {
        let _id = req.params._id || req.body._id;
        let messageItem = req.body;
        if(!_id){
            return res.status(400).json({error: 400, message: 'missing _id params'});
        }
        if(!messageItem.body){
            return res.status(400).json({error: 400, message: 'missing body params'});
        }
        Message.updateOne({'_id': _id}, {
            $set: {
                'body': messageItem.body,
                'status': messageItem.status || "Active",
                'isPalindrome': false
            }
        }, function (err) {
            if (err) {
                return res.json({error: 'can not update', message: 'can not update'});
            } else {
                return res.json({result: 1});
            }
        })
    };


    messageCtl.delete = function (req, res) {
        let _id = req.params._id || req.body._id;
        if(!_id){
            return res.status(400).json({error: 400, message: 'missing _id params'});
        }
        Message.findOneAndRemove({'_id': _id}, function (err) {
            if (err) {
                return res.json({error: 'can not delete', message: 'can not delete'});
            } else {
                return res.json({result: 1});
            }
        })
    };


    return messageCtl;
};
const express = require('express');
const router = express.Router();

let messageController = require('../controllers/message.controller')();


router.get('/',  messageController.list);

router.post('/',  messageController.create);

router.delete('/:_id', messageController.delete);

router.get('/:_id', messageController.retrieve);

router.put('/:_id', messageController.update);


module.exports = router;

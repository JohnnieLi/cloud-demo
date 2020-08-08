const express = require('express');
const router = express.Router();

// message
router.use('/messages', require('./message.route'));

module.exports = router;

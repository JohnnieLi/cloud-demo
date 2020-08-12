const express = require('express');
const router = express.Router();

let messageController = require('../controllers/message.controller')();


/**
 * @api {get} list all messages 
 * @apiName getAll
 * @apiParam {Number} page     the current page, starting from 1 (optional).
 * @apiParam {Number} size     the size of page items, default is 10
 * @apiSuccessExample Success-true:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": [],
 *     }
 * 
 * OR with page value, it will be pagination format
 * @apiSuccessExample Success-true:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": {
 *                 "docs":[],
 *                 "totalDocs":6,
 *                 "page":1,
 *                  ....
 *                },
 *     }
 */
router.get('/',  messageController.list);



/**
 * @api {post} create a messages 
 * @apiBody {String} body     the message body. 
 * @apiSuccessExample Success-true: return saved data
 *     HTTP/1.1 200 OK
 *     {
 *       "result": {
 *              "_id":"5f2dd933e542983da8073da7"
 *              "body":"XXX",
 *              "status":"Active",
 *              "isPalindrome":"false",
 *              "createdAt":"2020-08-07T22:44:03.662Z",
 *              "modifiedAt":"2020-08-07T22:44:03.662Z",
 *            }
 *     }
 */
router.post('/',  messageController.create);


/**
 * @api {delete} delete a messages 
 * @apiPathVariable {String} id     the _id of message. 
 */
router.delete('/:_id', messageController.delete);


/**
 * @api {get} get an existing messages 
 * @apiPathVariable {String} id     the _id of message. 
 */
router.get('/:_id', messageController.retrieve);


/**
 * @api {put} update an existing messages 
 * @apiPathVariable {String} id   the _id of message. 
 * @apiBody {String} body     the updating message body. 
 */
router.put('/:_id', messageController.update);


module.exports = router;

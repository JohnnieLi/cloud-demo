const express = require('express');
const router = express.Router();

let messageController = require('../controllers/message.controller')();


router.get('/',  messageController.list);

router.post('/',  messageController.create);

/**
 * @api {post} leases/:_id/delete delete lease
 * @apiName delete
 * @apiVersion 0.1.0
 * @apiGroup Lease
 *
 * @apiUse header
 *
 * @apiParam {String} _id      carlease mongodb _id.
 *
 * @apiParamExample {json} request-body-Example:
 *     {
 *       "_id": "askjdsucdsuich",
 *     }
 *
 * @apiSuccess {boolean} success server response status.
 * @apiSuccess {String} message  server message.
 *
 * @apiSuccessExample Success-true:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "inactive carlease successfully"
 *     }
 */
router.delete('/:_id', messageController.delete);


/**
 * @api {get} leases/:_id get carlease by id
 * @apiSampleRequest http://localhost:5555/api/lease/getCarLeaseById
 * @apiName getCarLeaseById
 * @apiVersion 0.1.0
 * @apiGroup Lease
 *
 * @apiParam {String} area     area
 * @apiParam {number} offset    offset.
 * @apiParam {number} limit     limit.
 *
 * @apiSuccess {boolean} success server response status.
 * @apiSuccess {String} message  server message.
 * @apiSuccess {Object} carLease  carLease object.
 *
 * @apiSuccessExample Success-true:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "got car lease"
 *       "carLease": Lease Object
 *     }
 */
router.get('/:_id', messageController.retrieve);

/**
 * @api {post} lease/:_id update lease
 * @apiName update
 * @apiVersion 0.1.0
 * @apiGroup Lease
 *
 * @apiUse header
 *
 * @apiParamExample {json} request-body-Example:
 *     {
 *       ...
 *     }
 *
 * @apiSuccess {boolean} success server response status.
 * @apiSuccess {String} message  server message.
 *
 * @apiSuccessExample Success-true:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "update carlease successfully"
 *     }
 */
router.put('/:_id', messageController.update);


module.exports = router;

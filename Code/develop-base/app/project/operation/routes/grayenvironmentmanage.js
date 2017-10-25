/**
 * Created by acer on 2017/5/11.
 */
var express = require('express');
var router = express.Router();
var config = require('../../../../config');
var greyenvironmtneService = require('../services/grayenvironmentmanageservice');
var utils = require('../../../common/core/utils/app_utils');


//获取平台信息 /grayenvironmentmanage/platform/info
router.route("/platform/info").get(function(req,res){
    greyenvironmtneService.getPlatfrom().then(function(rs){
        utils.respJsonData(res,rs)
    })
});

router.route("/deploy/info").get(function(req,res){
    var page=req.query.page;
    var rows=req.query.rows;
  var conditionMap = {};

    greyenvironmtneService.getDeploy(page, rows, conditionMap,function(rs){
        utils.respJsonData(res,rs)
    })
})


module.exports = router;
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

//获取灰度部署信息
router.route("/deploy/info").get(function(req,res){
    var gitlabProjectId=req.query.gitlabProjectId;
    //console.log("gitlabProjectIdgitlabProjectIdgitlabProjectId"+gitlabProjectId);
    greyenvironmtneService.getDeploy(gitlabProjectId,function(rs){
        utils.respJsonData(res,rs)
    })
});

//启动灰度部署
router.route("/start").get(function(req,res){
    var instance=req.query.instance;
    var imageName=req.query.imageName;
    var projectCode=req.query.projectCode;
    console.log("ssss"+instance+imageName+projectCode);
    greyenvironmtneService.start(instance,imageName,projectCode,function(rs){
        utils.respJsonData(res,rs)
    })
});

//更新灰度部署
router.route("/update").get(function(req,res){
    var instance=req.query.instance;
    var imageName=req.query.imageName;
    var projectCode=req.query.projectCode;
    console.log("ssss"+instance+imageName+projectCode);
    greyenvironmtneService.update(instance,imageName,projectCode,function(rs){
        utils.respJsonData(res,rs)
    })
});
//更新灰度部署表
router.route("/refreshGrayDeploy").get(function(req,res){
    greyenvironmtneService.refreshGrayDeploy();
});

//读取灰度表和实例表
router.route("/getGrayDeploy").get(function(req,res){
    var page = req.query.page;
    var length = req.query.rows;
    var projectId = req.query.projectId;
    var conditionMap = {};
    if(projectId){
        conditionMap.projectId = projectId;
    }
    // 调用分页
    greyenvironmtneService.pageList(page, length, conditionMap,function(result){
        utils.respJsonData(res, result);
    });
});

/***************运维中心-环境发布-获取项目健康情况*****************/
router.route("/environment/project").get(function(req,res){
   greyenvironmtneService.getProjectSituation().then(function(rs){
       utils.respJsonData(res,rs);
       console.log(res+'=============='+rs);
   })
})
module.exports = router;
/**
 * 已部署项目健康度、占用资源信息等信息获取
 */
var mysql = require('mysql');
var http = require('http');
var config = require('../../../../config');
var $util = require('../../../common/util/util');
var DateUtils = require('../../../common/core/utils/DateUtils');
var projectService = require('../../../project/dpm/services/projectService');
var mysqlPool = require('../../../project/utils/mysql_pool');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, config.mysql));
exports.doJob = function(){
    console.log('获取已部署项目健康度、占用资源等信息开始...' + DateUtils.format(new Date(),'yyyy-MM-dd hh:mm:ss'));
    //调用
    pool.getConnection(function(err, conn) {
        if (err != null) {
            console.log(err.message);
        } else {
            var sql = "select * from pass_develop_project_deploy where 1 = 1";
            conn.query(sql, function (err, result) {
                if(err){
                    console.log(err);
                }else {
                    var id,mesosId;
                    for(var i = 0; result != null && i < result.length; i++){
                        id = result[i].id;
                        mesosId = result[i].mesosId;
                        if(mesosId != null && mesosId != ""){
                            projectService.refreshDeployedInfo(id,mesosId);
                        }
                    }
                }
                conn.release();
            });
        }
    });
};

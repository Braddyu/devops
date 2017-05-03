var utils = require('../../../common/core/utils/app_utils');
var mysqlPool = require('../../utils/mysql_pool');

/**
 * 获取项目的分页数据
 * @param page
 * @param size
 * @param conditionMap
 * @param cb
 */
exports.pageList = function(page, size, conditionMap, cb) {
    var sql = " SELECT t.*,t1.imageVersion from pass_develop_image_info t  LEFT JOIN pass_develop_image_version t1 ON t.imageCode=t1.imageCode where 1=1" ;
    var conditions = [];
    // if(conditionMap) {
    //     if(conditionMap.image) {
    //         sql += " and (t.imageCode like '%" + conditionMap.image + "%')";
    //     }
    //     if(conditionMap.projectName) {
    //         sql += " and (t.channels like '%" + conditionMap.channels + "%')";
    //     }
    // }
    var orderBy = " order by t.imageCode desc";
    console.log("查询用户信息sql ====",sql);
    utils.pagingQuery4Eui_mysql(sql,orderBy, page, size, conditions, cb);
};

/**
 * 创建项目信息
 * @param data
 * @param cb
 */
exports.add = function(data, cb) {
    var sql = "insert into pass_develop_project_resources(projectCode,projectName,gitAddress,healthCondition,resourceUse,remark,createTime,createUser) values(?,?,?,?,?,?,now(),?)";
    mysqlPool.query(sql,data,function(err,results) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '创建项目信息异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '创建项目信息成功', null, null));
        }
    });
};

/**
 * 更新项目信息
 * @param data
 * @param cb
 */
exports.update = function(data, cb) {
    var sql = "update pass_develop_project_resources set projectCode = ?,projectName = ?,gitAddress = ?,healthCondition = ?,resourceUse = ?,remark = ? where id = ?";
    mysqlPool.query(sql, data, function(err,results) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '更新项目信息异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '更新项目信息成功', null, null));
        }
    });
};

/**
 * 删除项目信息
 * @param id
 * @param cb
 */
exports.delete = function(id, cb) {
    var sql = "delete from pass_develop_project_resources where id = ?";
    mysqlPool.query(sql,[id],function(err,results) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '删除项目信息异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '删除项目信息成功', null, null));
        }
    });
}
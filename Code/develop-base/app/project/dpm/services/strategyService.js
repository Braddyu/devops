var utils = require('../../../common/core/utils/app_utils');
var mysqlPool = require('../../utils/mysql_pool');
var Promise=require("bluebird");

/**
 * 分页查询
 * @param page
 * @param size
 * @param conditionMap
 * @param cb
 */
exports.pageList = function(page, size, conditionMap, cb){
    var sql = "select * from pass_project_strategy_config where 1=1 ";
    var conditions = [];
    if(conditionMap) {
        if(conditionMap.strategy_name) {
            sql += " and (strategy_name like '%" + conditionMap.strategy_name + "%')";
        }
    }
    var orderBy = " order by id asc";
    console.log("sql++++++++++++++++="+sql)
    utils.pagingQuery4Eui_mysql(sql,orderBy,page, size, conditions, cb);

};

/**
 * 新增策略
 * @param data
 * @param cb
 */
exports.add = function(data,cb){
    var strategy_name=data[0];
    var strategy_parameter=data[1];
    var trigger_shell=data[2];
    var remark=data[3];
    var status=data[4];
    var sql = "insert into pass_project_strategy_config(strategy_name,strategy_parameter,trigger_shell,remark,strategy_status) values('"+strategy_name+"','"+strategy_parameter+"','"+trigger_shell+"','"+remark+"','"+status+"')";
    mysqlPool.query(sql,data,function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '创建策略异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '创建策略成功', result, null));
        }
    });
};

/**
 * 修改策略
 * @param data
 * @param cb
 */
exports.update = function(data,cb){
    var strategy_name=data[0];
    var strategy_parameter=data[1];
    var trigger_shell=data[2];
    var remark=data[3];
    var status=data[4];
    var id=data[5];
    var sql = "update pass_project_strategy_config set strategy_name='"+strategy_name+"',strategy_parameter='"+strategy_parameter+"',trigger_shell='"+trigger_shell+"',remark='"+remark+"',strategy_status='"+status+"' where id="+id;
    mysqlPool.query(sql,data,function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '更新策略异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '更新策略成功', result, null));
        }
    });
};

/**
 * 获取单个策略
 * @param data
 * @param cb
 */
exports.getStrategy = function(id,cb){
    var sql = "select * from pass_project_strategy_config where id = ? ";
    mysqlPool.query(sql,[id],function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '获取单个策略信息异常', null, err));
        } else {

            cb(utils.returnMsg(true, '0000', '获取单个策略信息成功', result, null));
        }
    });
}


/**
 * 删除策略信息
 * @param id
 * @param cb
 */
exports.delete = function(id, cb) {
    var sql = "delete from pass_project_strategy_config where id = ?";
    mysqlPool.query(sql,[id],function (err,result) {
        if(err){
            cb(utils.returnMsg(false,'1000','删除策略信息异常',null,err));
        }else{
            cb(utils.returnMsg(true,'0000','删除策略信息成功',result,null));
        }
    })

}
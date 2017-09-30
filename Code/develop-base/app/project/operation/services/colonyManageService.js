
/**
 * Created by acer on 2017/5/11.
 */
var utils = require('../../../common/core/utils/app_utils');
var mysqlPool = require('../../utils/mysql_pool');
var config = require('../../../../config');
var https = require('https');

/**
 * 分页查询
 * @param page
 * @param size
 * @param conditionMap
 * @param cb
 */
exports.pageList = function(page,size,conditionMap,cb){
    var sql = "select * from pass_operation_colony_info ";
    var conditions = [];
    var orderSql = " order by id desc";
    console.log("查询集群信息sql ====",sql);
    utils.pagingQuery4Eui_mysql(sql,orderSql,page,size,conditions,cb);
};

/**
 * 获取单个集群
 * @param data
 * @param cb
 */
exports.getColony = function(id,cb){
    var sql = "select * from pass_operation_colony_info where id = ? ";
    mysqlPool.query(sql,[id],function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '获取单个集群信息异常', null, err));
        } else {

            cb(utils.returnMsg(true, '0000', '获取单个集群信息成功', result, null));
        }
    });
}

/**
 * 新增集群
 * @param data
 * @param cb
 */
exports.add = function(data,cb){
    var sql = "insert into pass_operation_colony_info(name,remark,createTime,createUser,mesosUrl,marathonUrl) values(?,?,now(),?,?,?)";
    mysqlPool.query(sql,data,function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '创建集群信息异常', null, err));
        } else {

            cb(utils.returnMsg(true, '0000', '创建集群信息成功', result, null));
        }
    });
}

/**
 * 更新集群信息
 * @param data
 * @param cb
 */
exports.update = function(data,cb){
    var sql = "update pass_operation_colony_info set name = ?,remark = ?,mesosUrl = ?,marathonUrl = ? where id = ? ";
    mysqlPool.query(sql, data, function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '更新集群信息异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '更新集群信息成功', result, null));
        }
    });
}

/**
 * 删除集群信息
 * @param id
 * @param cb
 */
exports.delete = function(id, cb) {
    var sql = "delete from pass_operation_host_info where colonyId = ?";
    var colonysql = "delete from pass_operation_colony_info where id = ?";
    mysqlPool.query(sql,[id],function (err,result) {
        if(err){
            cb(utils.returnMsg(false,'1000','删除集群主机信息异常',null,err));
        }else{
            mysqlPool.query(colonysql,[id],function(err,colonyresult) {
                if(err) {
                    cb(utils.returnMsg(false, '1000', '删除集群主机成功，删除集群信息异常', null, err));
                } else {
                    cb(utils.returnMsg(true, '0000', '删除集群信息成功', colonyresult, null));
                }
            });
        }
    })

}

exports.comboboxList = function(data, cb){
    var sql = "select * from pass_operation_colony_info where status = '1' and name is not null order by createTime desc";
    mysqlPool.query(sql,[],function(err,result) {
        if(err) {
            cb(utils.returnMsg(false, '1000', '获取集群列表失败', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '获取集群列表成功', result, null));
        }
    });
}
/**
 * 同步集群资源
 */
exports.syncColonyInfo = function(){
    var url = config.platform.mesosHost + "/metrics/snapshot";
    var http = require("http");
    http.get(url, function(resp){
        if(resp.statusCode == 200){
            var rhtml = '';
            resp.setEncoding('utf8');
            resp.on('data', function (chunk) {
                rhtml += chunk;
            });
            resp.on('end', function () {
                //将拼接好的响应数据转换为json对象
                rhtml = rhtml.replace(new RegExp("\\\\/","gm"),"_");
                var json = JSON.parse(rhtml);
                if(json){
                    var diskTotal = json.allocator_mesos_resources_disk_total;
                    var diskUsed = json.allocator_mesos_resources_disk_offered_or_allocated;
                    var memTotal = json.allocator_mesos_resources_mem_total;
                    var memUsed = json.allocator_mesos_resources_mem_offered_or_allocated;
                    var cpuTotal = json.allocator_mesos_resources_cpus_total;
                    var cpuUsed = json.allocator_mesos_resources_cpus_offered_or_allocated;
                    var cputool = "总量:" + cpuTotal + "核</br>" + "已使用:" + cpuUsed + "核(" +  (cpuUsed * 100/cpuTotal).toFixed(2) + "%)</br>空闲:"+(cpuTotal-cpuUsed)+"核";
                    if(diskTotal<=1024*1024){
                        var disktool = "总量:" + (diskTotal/1024).toFixed(2) + "G</br>" + "已使用:" + (diskUsed/1024).toFixed(2) + "G("  + (diskUsed / diskTotal).toFixed(2) + "%)</br>空闲:"+((diskTotal-diskUsed)/1024).toFixed(2)+"G";
                    }else{
                        var disktool = "总量:" + (diskTotal/1024/1024).toFixed(2) + "T</br>" + "已使用:" + (diskUsed/1024).toFixed(2)+ "G("  + (diskUsed / diskTotal).toFixed(2) + "%)</br>空闲:"+((diskTotal-diskUsed)/1024/1024).toFixed(2)+"T";
                        if(diskUsed>=1024*1024){
                            disktool = "总量:" + (diskUsed/1024/1024).toFixed(2) + "T</br>" + "已使用:" + (diskUsed/1024/1024).toFixed(2) + "T("  + (diskUsed / diskTotal).toFixed(2) + "%)</br>空闲:"+((diskTotal-diskUsed)/1024/1024).toFixed(2)+"T";
                        }
                    }
                    if(memTotal<=1024*1024){
                        var memorytool = "总量:" + (memTotal/1024).toFixed(2) + "G</br>" + "已使用:" + (memUsed/1024).toFixed(2) + "G("+(memUsed * 100/memTotal).toFixed(2) + "%)</br>空闲:"+((memTotal-memUsed)/1024).toFixed(2)+"G";
                    }else{
                        var memorytool = "总量:" + (memTotal/1024/1024).toFixed(2) + "T</br>" + "已使用:" + (memUsed/1024).toFixed(2) + "G("+(memUsed * 100/memTotal).toFixed(2) + "%)</br>空闲:"+((memTotal-memUsed)/1024/1024).toFixed(2)+"T";

                        if(memUsed>=1024*1024){
                            memorytool = "总量:" + (memTotal/1024/1024).toFixed(2) + "T</br>"+ "已使用:" + (memUsed/1024/1024).toFixed(2) + "T("+(memUsed * 100/memTotal).toFixed(2) + "%)</br>空闲:"+((memTotal-memUsed)/1024/1024).toFixed(2)+"T";

                        }
                    }
                    //容器时间要晚8小时，所以时间加了8小时
                    var sql = "update pass_operation_colony_info set totalCpu='"+cpuTotal+"',usedCpu='"+cpuUsed+"',totalMemory='"+memTotal+"',usedMemory='"+memUsed+"',totalDisk='"+diskTotal+"',usedDisk='"+diskUsed+"',`cputool`='" + cputool + "',`disktool`='" + disktool + "',`memorytool`='" + memorytool + "',updateDate=DATE_FORMAT(date_add(CURTIME(), interval 8 hour),'%Y-%m-%d %H:%i:%s'),updateTime=DATE_FORMAT(date_add(CURTIME(), interval 8 hour),'%H:%i:%s') where 1=1";
                    console.log(sql);
                    mysqlPool.query(sql,[],function(err,result) {
                        if(err) {
                            console.log("更新集群资源信息失败");
                        } else {
                            console.log("更新集群资源信息成功");
                        }
                    });
                }
            });
        } else{
            console.log("更新集群资源信息失败2");
        }
    }).on('error',function(e){
        console.log("Got error: " + e.message);
    });
}
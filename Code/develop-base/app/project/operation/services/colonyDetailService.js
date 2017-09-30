
/**
 * Created by acer on 2017/5/11.
 */
var utils = require('../../../common/core/utils/app_utils');
var mysqlPool = require('../../utils/mysql_pool');
var config = require('../../../../config');
var https = require('https');
var Promise=require("bluebird");

exports.getResourceByConoly = function(cb){
    var p = new Promise(function(resolve, reject) {
        var sql = 'select * from pass_operation_colony_info';
        mysqlPool.query(sql, function (err, results) {
            if (err) {
                cb(utils.returnMsg(false, '1000', '讀取硬件信息出错', null, err));
            } else {
                if (results && results.length > 0) {
                    cb(utils.returnMsg(true, '0000', '讀取硬件信息成功', results, null));
                }
            }
        });
    })
}

exports.getHostInfo = function(cb){
    var p = new Promise(function(resolve, reject) {
        var sql = 'select DISTINCT slave_ip,status,os from pass_operation_host_info';
        mysqlPool.query(sql, function (err, results) {
            if (err) {
                cb(utils.returnMsg(false, '1000', '讀取主机信息出错', null, err));
            } else {
                if (results && results.length > 0) {
                    cb(utils.returnMsg(true, '0000', '讀取主机信息成功', results, null));
                }
            }
        });
    })
}

exports.monitor = function(cb){
    var p = new Promise(function(resolve, reject) {
        var sql = "select * from pass_operation_colony_monitor where DATE_FORMAT(updateDate,'%Y-%m-%d')=DATE_FORMAT(date_add(CURTIME(), interval 8 hour),'%Y-%m-%d')";
        mysqlPool.query(sql, function (err, results) {
            if (err) {
                cb(utils.returnMsg(false, '1000', '查询监控信息出错', null, err));
            } else {
                if (results && results.length > 0) {
                    cb(utils.returnMsg(true, '0000', '查询监控信息成功', results, null));
                }
            }
        });
    })
}
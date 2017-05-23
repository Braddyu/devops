﻿/**
 * Created by ShiHukui on 2016/2/22.
 */
var project_url_prefix = "/project";
var config = {
    project:{
        appid:'DevOps',
        appname: '贵州移动DevOps平台', // App名字
        apptitle: '贵州移动DevOps平台', // 网页title
        appdescription: 'DevOps', // App的描述
        copyright:'©中国移动贵州公司 版权所有',
        keywords: 'cmcc,pass,docker',
        version: '0.0.1',
        report_version:"2016.1",//报表版本
        theme:'themes/beyond_rev/',// 默认主题，优先显示common_system_info中的sys_theme_layout
        url:'',
        appurl:project_url_prefix,
        appviewurl:'app/',
        password_suffix:'@cmcc',
        captcha_login_enable:false,// 是否开启登录验证码
        captcha_session_key:'captcha_session_key',
        menuflag:'codemanage'
    },
    datas:{
        tree_org:{
            root_node_name:'组织架构'// 机构根节点名称
        },
        tree_menu:{
            root_node_name:'ROOT'// 菜单根节点名称
        },
        tree_param:{
            root_node_name:'全部'// 菜单根节点名称
        }
    },
    session:{
        secret:'gmdp_secret_shk',
        key: 'gmdp_id',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie_maxAge:1800000,  //单位ms，即10分钟后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: false,
        rolling:true,
        //mongodb_url:'mongodb://10.201.253.195:27017/pass',
        mongodb_url:'mongodb://192.168.9.48:27017/pass',
        mongodb_collection:'common_user_session'
    },
    routes:{
        mount_path:'*/routes/*',// 路由挂载路径
        is_debug:true,// 是否开启调试模式
        mappings: {
            '/common/core/routes/': project_url_prefix,//默认路径
            '/common/syscfg/routes/': project_url_prefix + '/admin/api/common/syscfg/',//syscfg路由匹配路径
            '/common/uum/routes/': project_url_prefix + '/admin/api/common/uum/',//uum路由匹配路径
            '/common/bpm/routes/' : project_url_prefix + '/admin/api/common/bpm/',//bpm路由匹配路径
            '/common/job/routes/' : project_url_prefix + '/admin/api/common/job/',//schedule路由匹配路径
            '/common/portal/routes/': project_url_prefix + '/admin/api/common/portal/',//portal路由匹配路径
            '/common/report/routes/': project_url_prefix + '/admin/api/common/report/',//report路由匹配路径
            '/common/app/routes/': project_url_prefix + '/admin/api/common/app/',//portal路由匹配路径
            '/project/dpm/routes/': project_url_prefix + '/api/project/dpm/',//dpm路由匹配路径
            '/project/ability/routes/': project_url_prefix + '/api/project/ability/',//ability路由匹配路径
            '/project/operation/routes/': project_url_prefix + '/api/project/operation/',
        },
        welcome_path:project_url_prefix + '/home',
        // 不做权限检查url（支持通配符*，尽量少用）
        exclude_auth_check_urls:[project_url_prefix + '/login',project_url_prefix + '/captcha',project_url_prefix + '/test/*', project_url_prefix +'/static/*',project_url_prefix +'/api/project/dpm/interface/*'],
        // 登录后就能访问的url（无需授权）（支持通配符*，尽量少用）,如：修改个人信息、注销等操作
        logged_can_access_urls:[
            project_url_prefix + '/public/*',
            project_url_prefix + '/switchRole/*',
            project_url_prefix + '/logout',
            project_url_prefix + '/portal',
            project_url_prefix + '/api/demo/*'
        ]
    },
    mongdb:{
        //url: 'mongodb://10.201.253.195:27017/pass',
        url: 'mongodb://192.168.9.48:27017/pass',
        poolsize:20
    },
    memcached:{
        server_locations:['192.168.9.48:11211'],
        //server_locations:['127.0.0.1:11211'],
        options:{debug: true}
    },
    mysql:{
        host: '192.168.9.48',
        port:3306,
        user: 'root',
        password: 'root',
        database: 'pass'
    },
    //系统日志采集配置
    logger:{
        app_group : 'dw',
        app_id : 'proxy',
        logstashEnable: true,
        logType: "applog",
        //logstashHost:"10.201.253.67",
        logstashHost:"117.135.196.139",
        logstashPort : 18087 ,
        logstashLevel:"DEBUG",
        consoleLevel :"DEBUG",
        path : 'logs'
    },
    auth:{
        auth_type:'local',// local：本地认证；cas：单点登录认证
        //cas_server_url             : 'http://117.135.196.139:65080/cas',
        cas_server_url             : 'http://218.201.251.100:10032/cas/',
        cas_server_version         : '2.0',
        //cas_client_service_url     : 'http://117.135.196.139:30000',
        cas_client_service_url     : 'http://10.201.250.143:30001',
        cas_client_session_name    : 'cas_sso_user',
        password:{
            key_1:'ea5456ffa698a9d7b469bcdd768bc104',
            key_2:'180831b7e2e6daba6ee89dbdf7846293',
            key_3_prefix:'cmcc_gz_'
        },
        password_daily_err_count:10// 密码每日允许错误次数
    },
    mqtt:{
        is_use:true,// 是否使用mqtt
        server:{// mqtt服务器端配置
            is_load:true,// 是否需要加载mqtt服务器模块，若为false，则不启用mqtt服务器
            host:'127.0.0.1',// mqtt服务器地址
            port:1883,// mqtt服务器端口
            is_persistence:false,// 是否需要持久化mqtt消息,持久化会将消息保存在mongodb中
            mongo_settings:{// 如果需要持久化mqtt消息，则此配置有效
                url:'mongodb://127.0.0.1:27017/mqtt',
                collection:'pubsub'
            }
        },
        pub_client:{
            is_load:true,// 是否需要加载mqtt发布客户端模块，若为false，则不启用mqtt发布客户端
            server_host:'127.0.0.1',// mqtt服务器的host
            server_port:1883,// mqtt服务器的port
            client_ip:'127.0.0.1'// mqtt发布客户端的ip
        },
        sub_client:{// mqtt订阅客户端配置
            is_load:true,// 是否需要加载mqtt订阅客户端模块，若为false，则不启用mqtt订阅客户端
            server_host:'127.0.0.1',// mqtt服务器的host
            server_port:1883,// mqtt服务器的port
            client_ip:'127.0.0.1'// mqtt订阅客户端的ip
        }
    },
    platform:{
        // gitlabIp:'code.dev.gz.cmcc',
        gitlabIp:'192.168.9.48',
        gitlabPort:443,
        gitlabUrl: 'http://192.168.9.48',//vpn openvpn
        private_token:'BgNLAke5cybnRcqc-Qts',//192.168.31.127
        // private_token:'yJFsQXvox3xGHUPxyDsE',
        dockerIp: '192.168.31.92',
        dockerPort:5000,
        defaultImage: "ubuntu_base:0.2",
        superRolesId:"56d7e358a6fbe05a1394ad6e",
        userRoot:'/mnt/dockerts/',
        LableKey:'index',
        lableValue:'create',
        mesosHost:"http://192.168.9.45:5050",
        //marathonApi:"http://192.168.31.92:8080/v2/apps",
        marathonApi:"http://192.168.9.45:8080/v2/apps",
        //marathonLb:"http://192.168.31.94",
        //默认值，实际值会在deployedInfoSyncJob中刷新
        marathonLb:"http://192.168.9.51",
        influxDB:"http://192.168.9.48:8086/telegraf"
    }
}
module.exports = config;

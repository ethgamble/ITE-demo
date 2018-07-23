import Vue from 'vue';
import query from 'querystring' ;
import config from '../../config/config';

export default class Api {

    /* --- 成功处理 --- */
    static successReturn(context) {
        context.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success'
        })
    }

    /* --- 错误处理 --- */
    static errorReturn(opt, context) {
        context.$notify({
            title: '错误',
            message: opt.msg,
            type: 'error'
        })
        if (opt.status === 20001) { //    木有登录
            window.location.href = `${config.LOGIN_URL}`;
        }
    }

    static sysErrorReturn(context) {
        context.$notify({
            title: '服务器开小差～',
            message: '服务器开小差，请联系管理员～',
            type: 'error'
        })
    }
}

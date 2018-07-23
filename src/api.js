import Vue from 'vue';
import VueResource from 'vue-resource'
import query from 'querystring';
import config from './config';

Vue.use(VueResource)

const URL = "https://api.mycard.moe/ygopro/arena"

export default class Api {

    static uploadUrl = `${URL}/upload`

    static implUrl = `${URL}/impltrack`

    static clkUrl = `${URL}/clktrack`

    static saveActivity(opt) {
        const url = `${URL}/activity`
        return Vue.http.post(url, opt, { 'emulateJSON': true });
    }

}

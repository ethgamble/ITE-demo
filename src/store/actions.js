import Vue from 'vue'
import VueResource from 'vue-resource'
import * as types from './mutation-types'
import moment from 'moment'

Vue.use(VueResource)


export const isLogin = ({commit}, value) => {
    commit(types.isLogin, { value: value })
}

export const hasAccount = ({commit}, value) => {
    commit(types.hasAccount, { value: value })
}

export const hasWallet = ({commit}, value) => {
    commit(types.hasWallet, { value: value })
}

export const hasSign = ({commit}, value) => {
    commit(types.hasSign, { value: value })
}

export const account = ({commit}, value) => {
    commit(types.account, { value: value })
}

export const user = ({commit}, value) => {
    commit(types.user, { value: value })
}

export const dapp = ({commit}, value) => {
    commit(types.dapp, { value: value })
}

export const bihuInfo = ({commit}, value) => {
    commit(types.bihuInfo, { value: value })
}


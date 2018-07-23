import * as types from '../mutation-types'

const avatar_url_prefix = "https://bihu2001.oss-cn-shanghai.aliyuncs.com/";
const avatar_url_tail = "?x-oss-process=style/size_head";

// initial state
const state = {
    hasAccount: false,
    hasWallet: false,
    account: null,
    dapp: {
        memberCount: 0,
        signInCount: 0,
        totalSupply: 0,
        totalBurn: 0,
        owner: null,
        gate: 0
    },
    user: {
        token: 0,
        id: null,
        account: null,
        isLogin: false,
        username: "",
        signIn: [],
        address: "",
        hasSign: 0,

        avatar_url: avatar_url_prefix + "img/bihu_user_default_icon.png" + avatar_url_tail,
        userId: null,
        userName: null,
        artNum: 0,
        fans: 0,
        follows: 0,
        info: "这个人很懒。什么也没有留下。",
    }
}


// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    [types.user](state, {value}) {
        state.user.token = value.token
        state.user.id = value.id
        state.user.account = value.account
        state.user.username = value.username
        state.user.signIn = value.signIn
        state.user.address = value.address
        state.user.hasSign = value.hasSign
    },
    [types.isLogin](state, {value}) {
        state.user.isLogin = value
    },
    [types.hasAccount](state, {value}) {
        state.hasAccount = value
    },
    [types.hasWallet](state, {value}) {
        state.hasWallet = value
    },
    [types.account](state, {value}) {
        state.account = value
    },
    [types.bihuInfo](state, {value}) {
        state.user.avatar_url = avatar_url_prefix + value.userIcon + avatar_url_tail
        state.user.userId = value.userId
        state.user.userName = value.userName
        state.user.artNum = value.artNum
        state.user.fans = value.fans
        state.user.follows = value.follows
        state.user.info = value.info
    },
    [types.dapp](state, {value}) {
        var _value = JSON.parse(value);
        state.dapp.memberCount = _value.count
        state.dapp.signInCount = _value.signInCount
        state.dapp.totalSupply = _value.totalSupply
        state.dapp.totalBurn = _value.totalBurn
        state.dapp.gate = _value.gate
        state.dapp.owner = _value.owner

    },
    [types.hasSign](state, {value}) {
        state.user.hasSign = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}


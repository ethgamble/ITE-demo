export default {
    appName: "EOS Dapp Demo",
    tokenName: "EOS",
    version: "1.1",
    env: 'dev',
    contractName: "makeitbomb11",

    // local testnet
    // eosNetwork: {
    //     blockchain: 'eos',
    //     host: '127.0.0.1',
    //     port: 8888,
    //     chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    //     protocol: "http"
    // },

    // eosOptions: {
    //     broadcast: true,
    //     sign: true,
    //     chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    //     httpEndpoint: "http://127.0.0.1:8888"
    // },

    // remote testnet
    eosNetwork: {
        blockchain: 'eos',
        host: '120.27.237.92',
        port: 8888,
        chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
        protocol: "http"
    },
    eosOptions: {
        broadcast: true,
        sign: true,
        chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
        httpEndpoint: "http://120.27.237.92:8888"
    },

    // mainnet
    // eosNetwork: {
    //     blockchain: 'eos',
    //     host: 'api.eosnewyork.io',
    //     port: 443,
    //     chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    //     protocol: "https"
    // },

    // eosOptions: {
    //     broadcast: true,
    //     sign: true,
    //     chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    //     httpEndpoint: "https://api.eosnewyork.io:443"
    // },

}



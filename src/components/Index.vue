<template>
	<div id="wrap" style="max-width: 1200px">
		<div id="app">
			<div id="promo" v-bind:style="{ backgroundImage: 'url(' + promo + ')' }">
				<div class="jumbotron">
					<h3>{{ config.appName }}</h3>
					<p class="desc"><strong>三体.破壁计划</strong></p>
					<div class="text-center">
						<button class="btn btn-primary" @click.prevent="login" type="button"> 登陆 </button>
						<button class="btn btn-primary" @click.prevent="logout" type="button"> 注销 </button>
						<button class="btn btn-primary" @click.prevent="buy" type="button"> 买 </button>
						<button class="btn btn-primary" @click.prevent="sell" type="button"> 卖 </button>
						<button class="btn btn-primary" @click.prevent="destroy" type="button"> 销毁 </button>
						<br>
						<br>
						<button class="btn btn-primary" @click.prevent="globa" type="button"> 全局数据 </button>
						<button class="btn btn-primary" @click.prevent="gameinfo" type="button"> 游戏数据 </button>
						<button class="btn btn-primary" @click.prevent="userinfo" type="button"> 玩家数据 </button>
						<button class="btn btn-primary" @click.prevent="bonus" type="button"> 奖励数据 </button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import promo from "../assets/faith.jpg"
	import config from '../config/config.js'
	import moment from 'moment'
	import querystring from 'querystring';
	import { mapGetters } from 'vuex';

	import EOS from 'eosjs';

	export default {
		name: 'app',
		data() {
			return {
				account: "",
				promo: promo,
				config: config,

				// 用来获取区块链只读数据，不需要通过scatter
				eosClient: null,

				// 用来创建签名。转账、买、卖、销毁都需要用这个
				scatterEosClient: null,
			}
		},

		created() {
			this.eosClient = EOS(config.eosOptions);

			document.addEventListener('scatterLoaded', scatterExtension => {
				this.scatter = window.scatter;
				// window.scatter = null;
				this.scatter.requireVersion(3.0);
				this.scatterEosClient = this.scatter.eos(config.eosNetwork, EOS, config.eosOptions, "http");
			})

		},

		mounted() {

		},

		methods: {
			login() {
				this.scatter.getIdentity({
					accounts: [config.eosNetwork]
				}).then(identity => {
					//...
					console.log(identity);
					if (identity && identity.accounts.length > 0) {
						this.account = identity.accounts.find(account => account.blockchain === 'eos');
						console.log("current login user is ", this.account.name);
					}
				}).catch(error => {
					//...
				});
			},
			logout() {
				scatter.forgetIdentity().then(() => {
					//...
					console.log("forget");
				});
			},
			buy() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = "user1";
				var to = config.contractName;
				var amount = "100.0000 EOS"; // ps amount 参数有个很大的坑，它是 数字 + 代币符号拼接而成。数字记得要保留4为小数。
				var memo = "buy ram";

				var arg = [from, to, amount, memo]

				this.scatterEosClient.contract("eosio.token", { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});


			},
			sell() {
				const account = this.scatter.identity.accounts.find(account => account.blockchain === 'eos');

				const options = {
					authorization: [
						`${account.name}@${account.authority}`
					]
				};

				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var seller = "user1";
				var sell_amount = 11;  //ps 数字类型。不能是字符串
				var arg = [seller, account, sell_amount];

				this.scatterEosClient.contract(config.contractName, { requiredFields }).then(contract => {
					console.log(contract)
					contract.sell(seller, sell_amount, options).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			// 销毁智子操作
			destroy() {
				const account = this.scatter.identity.accounts.find(account => account.blockchain === 'eos');

				const options = {
					authorization: [
						`${account.name}@${account.authority}`
					]
				};

				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var seller = "user1";
				var sell_amount = 11;  //ps 数字类型。不能是字符串
				var arg = [seller, account, sell_amount];

				this.scatterEosClient.contract(config.contractName, { requiredFields }).then(contract => {
					console.log(contract)
					contract.destroy(seller, sell_amount, options).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			// 全局数据中，目前只有gameid这个字段，代表当前正在进行的是那一局游戏。
			globa() {
				this.eosClient.getTableRows({
					json: "true",
					code: config.contractName,
					scope: config.contractName,
					table: 'global',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
				}).catch((e) => {
					console.error(e);
				})
			},
			// 每一局游戏的数据
			gameinfo() {
				this.eosClient.getTableRows({
					json: "true",
					code: config.contractName,
					scope: config.contractName,
					table: 'game',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
				}).catch((e) => {
					console.error(e);
				})
			},
			// 玩家数据, account需要取当前用户。获得玩家数据。每一局的数据都有。再根据gameid关联数据。 ram_bytes 字段，就是持有的智子数量，后续改字段名。
			userinfo() {
				// hard code
				var account = "user1";

				this.eosClient.getTableRows({
					json: "true",
					code: config.contractName,
					scope: account,
					table: 'userinfo',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
				}).catch((e) => {
					console.error(e);
				})
			},
			// 阶段奖励数据
			bonus() {
				// hard code
				var gameid = 0;

				this.eosClient.getTableRows({
					json: "true",
					code: config.contractName,
					scope: gameid,
					table: 'bonus',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
				}).catch((e) => {
					console.error(e);
				})
			},
		}
	}

</script>




<style scoped>
	.projects-clean {
		color: #313437;
		background-color: #ffffff;
	}
	
	#promo {
		text-align: center;
		padding: 40px;
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 50px;
	}
	
	#wrap {
		padding: 30px;
		text-align: center;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 0px;
		padding: 30px;
	}
	
	.blank {
		margin-top: 30px;
	}
	
	.tipImg {
		margin-left: auto;
		margin-right: auto;
		height: 400px;
	}
	
	.el-input {
		margin-bottom: 10px
	}
	
	.el-tag + .el-tag {
		margin-left: 10px;
		margin-bottom: 10px
	}
</style>
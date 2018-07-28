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
						<button class="btn btn-primary" @click.prevent="claim" type="button"> 领取奖励(游戏结束才能领取) </button>
						<br>
						<br>
						<button class="btn btn-primary" @click.prevent="get_global" type="button"> 全局数据 </button>
						<button class="btn btn-primary" @click.prevent="get_gameinfo" type="button"> 游戏数据 </button>
						<button class="btn btn-primary" @click.prevent="get_userinfo" type="button"> 玩家数据 </button>
						<button class="btn btn-primary" @click.prevent="get_bonus" type="button"> 奖励数据 </button>
						<button class="btn btn-primary" @click.prevent="getCurrencyBalance" type="button"> 账户余额 </button>
						<button class="btn btn-primary" @click.prevent="getActions" type="button"> 操作记录 </button>
						<button class="btn btn-primary" @click.prevent="findByGameidDemo" type="button"> findByGameidDemo </button>
					</div>
				</div>
			</div>
			<div class="blank"></div>
			<div>
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">global</div>
						<div class="grid-content bg-purple">{{global}}</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple">current gameinfo</div>
						<div class="grid-content bg-purple">{{ gameinfo[global.gameid]}}</div>
					</el-col>
				</el-row>
				<br>
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">current game bonus</div>
						<div class="grid-content bg-purple">{{ bonus }}</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple">current game palyer info </div>
						<div class="grid-content bg-purple">{{ userinfo[global.gameid]}}</div>
					</el-col>
				</el-row>
				<br>
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">player balance </div>
						<div class="grid-content bg-purple">{{ balance}}</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple">actions </div>
						<div class="grid-content bg-purple">{{ actions }}</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import promo from "../assets/faith.jpg"
	import _ from "lodash"
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

				// 全局数据
				global: {
					gameid: null,
					// 空投奖励的计数器间隔
					air_drop_step: 0,
					// 最终大奖瓜分奖池的比例 . ？% = 100 / end_prize_ratio
					end_prize_ratio: 0,
					// 最终大奖收益倍数
					end_prize_times: 0,
					// 销毁智力总数 占 总智子数的比例。达到这个比例 游戏结束。 合约内部数据类型原因，比例用除法表示 10表示销毁百分之十 游戏结束。
					good_ending_ratio: 10,
					// 已激活智力总数 占 当前有效智子数（不含已销毁）的比例。达到这个比例 游戏结束。 合约内部数据类型原因，比例用除法表示 。 10表示激活百分之十 游戏结束。
					bad_ending_ratio: 10,
				},
				// 游戏数据
				gameinfo: [
					{
						"gameid": 0,		// 游戏id，唯一，每局一个
						"status": 0,		// 状态，0 是进行中， 1 是已结束
						"counter": 0,      // 操作计数器。阶段奖励的依据
						"init_max": "68718748890", // 智子初始总数
						"total_burn": 0,   // 总销毁智子数量
						"total_alive": "68718748890", // 总可用智子数量
						"total_reserved": 0,  // 当前已经激活智子
						"quote_balance": "1010689.1369 EOS",  // 当前合约总保证金
						"init_quote_balance": "1000000.0000 EOS", // 初始保证金
						"hero": "", // 游戏结束后，触发结局的英雄
						"claim_price": "",  // 游戏结束后，claim的单价。（每个智子单价）
						"start_time": "",  // 游戏开始时间
						"end_time": "",  // 游戏结束时间
						"hero_reward": "",  // 游戏结束后，触发结局的英雄拿到的奖励
					}
				],

				// 玩家信息
				userinfo: [
					{
						"gameid": 0,			// 游戏id，唯一，每局一个
						"owner": "user1",		// 玩家账号
						"hodl": 726783914,	   // 拥有的智子 hodl: 币圈搞怪名词，持有之意
						"claim_status": 0,	   // 当局奖励 是否已领取
					}
				],
				// 阶段奖励记录
				bonus: [
					{
						"count": 11110,    // 

						"gameid": 0,		// 游戏id，
						"owner": "user1", // 玩家账号
						"reward": "0.0010 EOS" // 获得的奖励
					}
				],

				// 账户余额
				balance: {
					eos: "0 EOS",
					ite: "0 ITE",
				},

				// 操作记录
				actions: {

				}
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
				var to = config.gameContract;
				var amount = "40000.0000 " + config.tokenName; // ps amount 参数有个很大的坑，它是 数字 + 代币符号拼接而成。数字记得要保留4为小数。
				var memo = "activate";

				// wit
				// Ash Katchum; astute
				// Sa To Ko

				var arg = [from, to, amount, memo]

				this.scatterEosClient.contract(config.tokenContract, { requiredFields }).then(contract => {
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

				this.scatterEosClient.contract(config.gameContract, { requiredFields }).then(contract => {
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

				this.scatterEosClient.contract(config.gameContract, { requiredFields }).then(contract => {
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
			get_global() {
				this.eosClient.getTableRows({
					json: "true",
					code: config.gameContract,
					scope: config.gameContract,
					table: 'global',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
					if (data.rows && data.rows.length > 0) {
						this.global = data.rows[0];
					}
				}).catch((e) => {
					console.error(e);
				})
			},
			// 每一局游戏的数据
			get_gameinfo() {
				this.eosClient.getTableRows({
					json: "true",
					code: config.gameContract,
					scope: config.gameContract,
					table: 'game',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
					this.gameinfo = data.rows;
				}).catch((e) => {
					console.error(e);
				})
			},
			// 玩家数据, account需要取当前用户。获得玩家数据。每一局的数据都有。再根据gameid关联数据。
			get_userinfo() {
				// hard code
				var account = "user1";

				this.eosClient.getTableRows({
					json: "true",
					code: config.gameContract,
					scope: account,
					table: 'userinfo',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
					this.userinfo = data.rows;
				}).catch((e) => {
					console.error(e);
				})
			},
			// 阶段奖励数据
			get_bonus() {
				// hard code
				var gameid = 0;

				this.eosClient.getTableRows({
					json: "true",
					code: config.gameContract,
					scope: gameid,
					table: 'bonus',
					limit: 10,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
					this.bonus = data.rows;
				}).catch((e) => {
					console.error(e);
				})
			},

			getCurrencyBalance() {
				// hard code
				var account = "testuser2";

				// 获取EOS
				this.eosClient.getCurrencyBalance({
					code: config.tokenContract,
					account: account,
					symbol: config.mainToken
				}).then(res => {
					console.log(res);
					this.balance.eos = res[0];
				}, res => {
					console.log(res);
				})

				// 如果是ITE盘, 需要另外再获取ITE余额
				if (config.tokenName == "ITE") {
					this.eosClient.getCurrencyBalance({
						code: config.tokenContract,
						account: account,
						symbol: config.tokenName
					}).then(res => {
						console.log(res);
						this.balance.ite = res[0];
					}, res => {
						console.log(res);
					})
				}
			},

			getActions() {
				// hard code， 单个用户的操作记录
				var account = "user1";
				// 如果是全部人的操作记录, account = config.gameContract
				// var account = config.gameContract;
				// 获取EOS
				this.eosClient.getActions({
					account_name: account,
					pos: -1,     // INT sequence number of action for this account, -1 for last . default -1
					offset: -100  // INT get actions [pos,pos+offset] for positive offset or [pos-offset,pos) for negative offset
				}).then(res => {
					this.actions = res.actions.map(x => {
						return x.action_trace.act;
					}).filter(y => {
						console.log(y);
						// buy record
						if (y.account == config.tokenContract && y.name == "transfer" && y.data.to == config.gameContract) {
							return true;
						}
						// sell record 
						if (y.account == config.gameContract && y.name == "sell") {
							return true;
						}
						// destroy record 
						if (y.account == config.gameContract && y.name == "destroy") {
							return true;
						}
						return false;
					});
				}, res => {
					console.log(res);
				})
			},

			claim() {
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
				var user = "user1";
				var claim_gameid = 0;  //领取第几局奖励

				this.scatterEosClient.contract(config.gameContract, { requiredFields }).then(contract => {
					contract.claim(user, claim_gameid, options).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},

			// 演示如何根据gameid 获取一个数组中的 某一个符合条件的对象。
			findByGameidDemo() {
				var games = this.gameinfo;
				var gameid = this.global.gameid;

				var currentGame = _.find(games, _.matches({ gameid: gameid }));

				console.log("currentGame", currentGame);
			}
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
	
	.bg-purple {
		background: #d3dce6;
	}
</style>
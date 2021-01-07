import Web3 from 'web3';
import Vue from "vue";
import store from '../store/index.js';
import axios from "../api/request.js";
// import { Tab } from "vant";
// import { Progress } from "vant";

let web3;
// 环境检测
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	// console.log('有web3环境')
	var _this = this;
	store.commit('setIsWeb3', true);
	web3 = new Web3(window.web3.currentProvider); //提供浏览器环境的插件地址
	// if (web3.currentProvider.isMetaMask == true) {
	// 	// console.log('metamask环境')
	// 	store.commit('setIsMm', true);
	// } else {
	// 	// console.log('非metamask环境')
	// 	store.commit('setIsMm', false);
	// }
	//版本号
	store.commit('setIsVersion', web3.version);
	// 当前网络
	web3.eth.net.getId()
	.then((res)=>{
		store.commit('setIsNetworkId', res);
		store.commit('setIsAddress','');//切换网络时候清空用户登录数据
		//获取本地账户
		web3.eth.getAccounts()
		.then((acc)=>{
			if(acc.length!=0){
				store.commit('setIsAddress',acc[0]);//显示当前钱包地址
				web3.eth.defaultAccount = acc[0]; //设置默认账号
				axios.post("user/login",{
					address: acc[0] ,
					}).then((res) => {
				  store.commit('setToken',res.data.token)
				  localStorage.setItem("jzg_token",res.data.token);
				});
				web3.eth.getBalance(acc[0])
				.then((bnum)=>{
					store.commit('setIsBalance',web3.utils.fromWei(bnum,'ether'));
				});
			}else{
				console.log('没有账号')
			}
		})
		if(res==3){
			//获取本地账户
			web3.eth.getAccounts()
			.then((acc)=>{
				if(acc.length!=0){
					store.commit('setIsAddress',acc[0]);//显示当前钱包地址
					web3.eth.defaultAccount = acc[0]; //设置默认账号
					axios.post("user/login",{
						address: acc[0] ,
						}).then((res) => {
					  store.commit('setToken',res.data.token)
					  localStorage.setItem("jzg_token",res.data.token);
					});
					web3.eth.getBalance(acc[0])
					.then((bnum)=>{
						store.commit('setIsBalance',web3.utils.fromWei(bnum,'ether'));
					});
				}else{
					console.log('没有账号')
				}
			})
		}else{
			store.commit('setIsAddress','');//切换网络时候清空用户登录数据
		}
	})
	// web3.eth.getAccounts()
	// .then((res)=>web3.eth.getBalance(res[0]))
	// .then((bnum)=>{
	// 	console.log(bnum)
	// console.log(web3.utils.fromWei(bnum,'ether'))
	// store.commit('setIsBalance',web3.utils.fromWei(bnum,'ether'));
	// });

} else {
	store.commit('setIsWeb3', false);
	// console.log('需要安装metamask')
	//可以指定一个节点
	// this.$store.commit('setIsWeb3',true);
	// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

export default web3;

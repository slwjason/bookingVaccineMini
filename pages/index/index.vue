<template>
	<view>
		<view class="header"
			style="background: url(../../static/imgs/top1.jpg); background-repeat: no-repeat;  background-size: 100% 100%;">


		</view>
		<view class="tab">
			<text :class="item.isActive ? 'active' : ''" v-for="item in tablist" @click="tabActive(item.index)"
				class="tabItem" :key="item.index">{{item.value}}</text>
		</view>
		<view class="box2">
			<content :news="news"></content>
			<!-- <tabDetails :planLocate="planLocate" ></tabDetails> -->
		</view>
		<view class="footer">
			我是有底线的...
		</view>
		<!-- <view class="notice" @click="open">
			<view class="notice_btn">
				<p>通</p>
				<p>知</p>
			</view>
			<view>
				<image id="bell" :class="isRun?'bell_animation':''" src="../../static/icons/通知.png"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	import tabDetails from "../../components/tabs/tab_details.vue"
	import content from "./content.vue"
	var bmap = require('../../static/js/bmap-wx.js');
	var wxMarkerData = [];
	const cheerio = require('cheerio')
	// const jquery = require('jquery')
	export default {
		components: {
			tabDetails,
			content
		},
		data() {
			return {
				news: [],
				isRun: true,
				positionSelect: true,
				//小程序获取的微信坐标
				// latitude: '',
				// longitude: '', 
				tablist: [{
						index: 0,
						value: '接种预约',
						isActive: true,
						height: 100
					},
					{
						index: 1,
						value: '疫苗问答',
						isActive: false,
						height: 500
					},
					{
						index: 2,
						value: '最新动态',
						isActive: false,
						height: 1280
					}
				],
				amapPlugin: null,
				key: 'a776b4ad7a2b48b4a788a081332d6b85', //存放高德地图的key



			}
		},
		onLoad() {

			let that = this
			this.getLocation(function(res) {
					wx.setStorage({
						key: 'address',
						data: res
					})

				}),
				this.storageTimeOut(),
				// session 参数 key（后台吐回）
				//判断是否第一次
				wx.getStorage({
					key: 'opid_sessionKey',
					success: function(res) {

					},
					fail: function(res) {
						that.getUserProfile()
					}

				})
			// this.map()

			// that.getUserProfile()

			this.findNews()

		},
		methods: {
			//下拉刷新
			onPullDownRefresh() {
				this.findNews()
				setTimeout(() => {

					uni.stopPullDownRefresh()
				}, 1000);
			},
			//访问新闻网站
			//查找未处理预约记录
			async findNews() {
				let that = this
				const result = await this.$myRuquest({
					url: '/findNews',
					method: 'POST',

				})
				that.news = result.data.data


			},
			onPageScroll(res) {
				if (res.scrollTop < 500) {
					this.tabActive2(0)
				}
				if (res.scrollTop >= 500 && res.scrollTop <= 1200) {
					this.tabActive2(1)
				}
				if (res.scrollTop > 1200) {
					this.tabActive2(2)
				}

			},
			//tab
			tabActive(tabIndex) {
				this.tablist.map((value, index) => {
					value.isActive = tabIndex == index ? true : false
				})
				for (var i = 0; i < this.tablist.length; i++) {
					if (tabIndex == this.tablist[i].index) {
						this.togglePosition(this.tablist[i].height)
					}
				}
			},
			tabActive2(tabIndex) {
				this.tablist.map((value, index) => {
					value.isActive = tabIndex == index ? true : false
				})
			},
			// 点击tab栏描点到相应位置
			togglePosition(height) {
				wx.createSelectorQuery().select('.box2').boundingClientRect(function(rect) {
					// 使页面滚动到底部
					// console.log(rect.bottom)
					// console.log(rect.height)
					wx.pageScrollTo({
						scrollTop: height,
						duration: 0
					})
				}).exec()
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				// this.$refs.popup.open()
				this.isRun = false
				uni.navigateTo({
					url: '/pages/notice/notice',
				});
			},

			//上拉加载
			onReachBottom() {
				if (this.contentIndex <= 3)
					this.contentIndex++
			},
			//设置storage的过期时间.把一个时间也一起缓存，判断时间是否过期，如果过期清除缓存
			storageTimeOut() {
				let timestamp = Date.parse(new Date());
				let expiration = timestamp + 900000; //缓存15分钟
				let data_expiration = wx.getStorageSync("data_expiration");
				if (data_expiration) {
					if (timestamp > data_expiration) {
						wx.clearStorageSync()
						wx.setStorageSync("data_expiration", expiration)
					}
				} else {
					wx.setStorageSync("data_expiration", expiration)
				}
			},

			//获取用户信息
			getUserProfile() {
				wx.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					success(res) {
						//如果用户点击了确定按钮
						if (res.confirm) {
							// 重新登录
							wx.login({
								success: function(res) {
									console.log(res)
									//开发者工具
									if (res.code != undefined || res.code != '') {

										//发起网络请求
										wx.request({
											url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxee96db1038a97331&secret=c890a09afa627d6d556a9c1a5e54afce&js_code=' +
												res.code + '&grant_type=authorization_code',
											data: {
												code: res.code
											},
											header: {
												'content-type': 'application/json' //默认值
											},
											success: function(res) {
												wx.setStorage({
													key: 'opid_sessionKey',
													data: res.data
												})
											},


										})
									} else {
										console.log('获取用户登录态失败！' + res.errMsg)
									}
								},
								fail: function(res) {
									console.log(res)
								},
								timeout: 5000
							});
							wx.getUserProfile({
								desc: '获取你的昵称、头像、地区及性别',
								success: res => {

									wx.setStorage({
										key: 'userInfo',
										data: res.userInfo
									})
								},
								fail: res => {

									//拒绝授权
									wx.showToast({
										title: '您拒绝了请求,不能正常使用小程序',
										icon: 'error',
										duration: 2000
									});
									return;
								}
							});
						} else if (res.cancel) {
							//如果用户点击了取消按钮

							wx.showToast({
								title: '您拒绝了请求,不能正常使用小程序',
								icon: 'error',
								duration: 2000
							});
							return;
						}
					},
				})
			},
			//获取用户地址信息
			getLocation(callback) {
				let that = this
				uni.getLocation({
					type: 'wgs84',
					altitude: true,
					isHighAccuracy: true,
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					success: function(res) {
						//将地址坐标保存到storage
						callback(res)

					},
					fail: function() {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon: 'none'
						});
					}
				});
				// An highlighted block

			},
		},
	}
</script>

<style lang="scss">
	.header {
		width: 750rpx;
		height: 200rpx;
		// background-image: url(~@/static/imgs/top1.jpg);


		display: flex;
		justify-content: flex-end;
		align-items: center;
	}


	.content_items {
		display: flex;

		.content_item {
			text-align: center;
			float: left;
			padding: 10rpx 0;
			flex: 1;
		}
	}

	.active {
		color: #03b4ff;
		border-bottom: 5rpx solid #03b4ff;
	}

	.tab {
		position: sticky;
		top: 0;
		z-index: 999;
		display: flex;
		background: #fff;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 16px;
	}

	.tabItem {
		width: 240rpx;
		text-align: center;
	}

	.box2 {
		height: 100%;
		width: 100%;
	}

	,
	.notice {
		position: fixed;
		// width: 100px;
		// height: 400px;
		right: 0px;
		top: 200px;
		z-index: 1000;
		color: #f5f5f5;
	}

	.notice_btn {
		border-top-left-radius: 15rpx;
		border-bottom-left-radius: 15rpx;
		background-color: #aac8ef;
		width: 50rpx;
	}

	.notice p {
		text-align: center;
	}

	#bell {
		width: 50rpx;
		height: 50rpx;
		// animation: rotate 1.5s linear infinite;
		// transform-origin: 50% 0;
		// animation-play-state:paused;
	}

	.bell_animation {
		animation: rotate 1.5s linear infinite;
		transform-origin: 50% 0;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);

		}

		25% {
			transform: rotate(45deg);
		}

		75% {
			transform: rotate(-45deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}

	.footer {
		font-size: 12px;
		color: #F0AD4E;
		width: 100%;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
	}
</style>

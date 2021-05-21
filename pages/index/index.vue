<template>
	<view>
		<view class="header" style="background: url(../../static/imgs/top1.jpg); background-repeat: no-repeat;  background-size: 100% 100%;">
			<view class="selectAddress">
				<AddressPicker @change="change" :level="2">{{planLocate}}
				<view class="container"></view>
				</AddressPicker> 
			</view>
	
		</view>
		<view class="tab">
			<text :class="item.isActive ? 'active' : ''" v-for="item in tablist" @click="tabActive(item.index)" class="tabItem" :key="item.index" >{{item.value}}</text>
		</view>
		<view>
			<content></content>
			<!-- <tabDetails :planLocate="planLocate" ></tabDetails> -->
		</view>
	</view>
</template>

<script>
	import AddressPicker from "@/components/lingdang-AddressPicker/AddressPicker.vue"
	import tabDetails from "../../components/tabs/tab_details.vue"
	import content from "./content.vue"
	export default {
		components:{AddressPicker,tabDetails,content},
		data() {
			return {
				tablist: [{
						index: 0,
						value: '接种预约',
						isActive: true
					},
					{
						index: 1,
						value: '疫苗问答',
						isActive: false
					},
					{
						index: 2,
						value: '最新动态',
						isActive: false
					}
				],
					amapPlugin: null,  
					key: 'a776b4ad7a2b48b4a788a081332d6b85', //存放高德地图的key
					planLocate:'请选择地区',
					//小程序获取的微信地址信息
					addrDel:'',
					addressName: '',
					
				}
		},
		onLoad() {
			let that = this
			this.getLocation(function(addrDel){
				that.addrDel = addrDel
				
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
			
			// that.getUserProfile()
		 
					
		
		},
		methods: {
			//tab
			tabActive(tabIndex) {
				this.tablist.map((value, index) => {
					value.isActive = tabIndex == index ? true : false
				})
				
			},
			//上拉加载
		onReachBottom () {
			if(this.contentIndex<=3)
				this.contentIndex++
		  },
		//设置storage的过期时间.把一个时间也一起缓存，判断时间是否过期，如果过期清除缓存
		storageTimeOut(){
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
		 //父组件的获取子组件传递的值， 在为josn 有code和name
		change(result) { 
			 JSON.stringify(result.data);
			   this.planLocate = ''; 
			   result.data.forEach( (item,index) =>{ 
				   if(index===1){ this.planLocate += item.name 
						}
				   }
				   ) ; 
				   let arr =this.planLocate.split('-'); 
				   
		 },
		//获取用户信息
		getUserProfile(){
			
				wx.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					success(res) {
						//如果用户点击了确定按钮
						if (res.confirm) {
							// 重新登录
							wx.login({
							      success: function(res) {
									 
									  //开发者工具
							        if (res.code!=undefined||res.code!='') {
							          //发起网络请求
							          wx.request({
							            url:'https://api.weixin.qq.com/sns/jscode2session?appid=wxee96db1038a97331&secret=c890a09afa627d6d556a9c1a5e54afce&js_code='+res.code+'&grant_type=authorization_code',
							            data: {
							              code: res.code
							            },
										header: {
										   'content-type': 'application/json' //默认值
										},
										success:function(res){
											
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
								  timeout:5000
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
		getLocation (callback) {
				let that = this
				uni.getLocation({
								type: 'wgs84',
								geocode:true,//设置该参数为true可直接获取经纬度及城市信息
								success: function (res) {
									callback(res)
									console.log(res)
									
								},
								fail: function () {
									uni.showToast({
										title: '获取地址失败，将导致部分功能不可用',
										icon:'none'
									});
								}
							});
							// An highlighted block
					
			},
		},
	}
</script>

<style lang="scss">
	
	.header{
	  width: 750rpx;
	  height: 200rpx;
	  // background-image: url(~@/static/imgs/top1.jpg);
	 
	
	  display: flex;
	  justify-content: flex-end;
	  align-items: center;
	 }
	 .selectAddress{
	  border: 1px #00d59c solid;
	  width:200rpx;
	  height:40rpx;
	  border-radius: 20rpx;
	  position: absolute;
	  padding: 5rpx;
	  color: #00d59c;
	 }
	 .container{
	  position: relative;
	  right: -83px;
	  top: -13px;
	  width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
	  height: 0px;
	  border:6px solid #00d59c;
	  border-bottom-color: transparent;    /* 设置透明背景色 */
	  border-left-color: transparent;
	  border-right-color: transparent;
	
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
		color: blue;
		border-bottom: 5rpx solid blue;
	}
	  .tab{
		  position: sticky;top: 0;z-index: 999;
		  display: flex;
		  background: #fff;
		  height: 100rpx;
		  line-height: 100rpx;
		  font-size: 16px;
	  }
	  .tabItem{
		  width:240rpx;
		  text-align: center;
	  }
	  
</style>

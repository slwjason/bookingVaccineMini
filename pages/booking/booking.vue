<template>
	<view>
		<view class="body">
			<view class="header">
				<view class="buffet" @click="zizhu"> 
					<view class="left">
						<uni-badge text="1" type="warning" size="small"></uni-badge>
						<text>自助建档</text>
						<view>建立临时档案后预约</view>
					</view>
					<view class="right">图片</view>
				</view>
				<view class="buffet">
					<view class="left">
							<uni-badge text="2" type="warning" size="small"></uni-badge>
							<text>绑定正式档案</text>
							<view>完成接种后请绑定</view>
					</view>
					<view class="right">图片</view>
					</view>
				</view>
			<view class="lists">
				<text class="titile">成人档案列表</text>
				<uni-card  v-for="item in archives" class="card">
					<view class="item_left">
						<text class="name">{{item.name}}</text>
						<text class='sex'>{{item.sex}}</text>
						<text class="age">{{item.age}}</text>
						<view class="idView">
							<text class="idCard">证件号:{{item.idCard}}</text>
							<text class="linshi">临时</text>
						</view>
					</view>
					<view class="item_right">></view>
				</uni-card>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	export default {
	
		data() {
			return {
				
				archives:[],
				openId:''
				}
		},
	
		onLoad() {
			this.getUserInfo()
		
			// this.getSwipers()
			// const res = await this.$myRuquest({
			// 	url: '/users/findUser'
			// })
			// console.log(res)
			 
		},
		methods: {
			////获取微信用户信息
			getUserInfo(){
				let that = this
				wx.getStorage({
						key: 'opid_sessionKey',
						success: function(res) {
						 that.openId= res.data.openid
						 that.findArchives()
						},
						fail: function(res) {
						}
				 
					  })
				
			},
			find(){
				console.log(this.openId)
			},
		  async zizhu () {
						uni.navigateTo({
						  url: '/pages/booking/archives',
						})
					},
			//查找当前微信用户建档记录
			//提交建档数据
			async findArchives() {
				let that = this
				console.log(that.openId)
				const result = await this.$myRuquest({
					url: '/users/findArchives',
					method:'POST',
					data:{
						wxId:that.openId,
					},
				})
				that.archives = result.data.data
				console.log(result)
			},
		},
		
		
	}
</script>

<style lang="scss">
	page{
		background-color: #ccc;
	}
	.header{
		width: 700rpx;
		height: 100rpx;
		display: flex;
		margin: 10px auto;	
		justify-content: space-between;
		align-content: space-between;  /* 竖向中间自动空间 */
	}
	.header .buffet{
		width: 340rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
	}
	.header .buffet .left{
		width: 230rpx;
		height: 100rpx;
	}
	.header .buffet .left text{
		font-size: 12px;
	}
	.header .buffet .left view{
		margin: 2px;
		font-size: 8px;
	}
	.lists .titile{
		font-size: 12px;
		margin-left: 20px;
	}
	.card{
		width: 750rpx;
		
	}
	.item_left{
		width: 550rpx;
	
		float: left;
	}
	.item_right{
		width: 50rpx;
		
		float: right;
		margin-top: 15px;
		text-align: right;
	}
</style>

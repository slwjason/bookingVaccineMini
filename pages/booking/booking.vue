<template>
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
		</view>
		
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
			
				}
		},
	
		onLoad() {
			// this.getSwipers()
			// const res = await this.$myRuquest({
			// 	url: '/users/findUser'
			// })
			// console.log(res)
			    
		},
		methods: {
			 
		
		  async zizhu () {
						uni.navigateTo({
						  url: '/pages/booking/archives',
						})
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
		font-size: 14px;
	}
	.header .buffet .left view{
		margin: 2px;
		font-size: 8px;
	}

</style>

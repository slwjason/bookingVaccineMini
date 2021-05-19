<template>
	<view class="bg">
		<view class="frame">
			<view class="title_">
				<p>疫苗科普</p>
			</view>
			<view class="bd">
				<view class="box b1" @click="go1()">
					<p class="problem">老人小孩能否接种？</p>
					<p class="describe">疫苗对年龄的要求</p>
				</view>
				<view class="box b2" @click="go2()">
					<p class="problem">女性接种注意什么？</p>
					<p class="describe">“女神”接种疫苗宝典</p>
				</view>
				<view class="box b3" @click="go3()">
					<p class="problem">什么人不建议接种？</p>
					<p class="describe">7种情况不建议接种</p>
				</view>
				<view class="box b4" @click="go4()">
					<p class="problem">正在吃药能否接种？</p>
					<p class="describe">药物对疫苗的影响</p>
				</view>
				<view class="box b5" @click="go5()">
					<p class="problem">有过敏史能否接种？</p>
					<p class="describe">大多数情况不用担心</p>
				</view>
				<view class="box b6" @click="go6()">
					<p class="problem">有慢性病能否接种？</p>
					<p class="describe">详解慢性病的限制</p>
				</view>
				<view class="clear"></view>
			</view>
			<view class="title_">
				<p>疫苗类型</p>
			</view>
			<view class="type">
				<image src="../../static/imgs/疫苗类型.jpg"></image>
			</view>
		</view>	 	
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			go1 () {
			  uni.navigateTo({
			    url: '/pages/question/question1',
			  })
			},
			go2 () {
			  uni.navigateTo({
			    url: '/pages/question/question2',
			  })
			},
			go3 () {
			  uni.navigateTo({
			    url: '/pages/question/question3',
			  })
			},
			go4 () {
			  uni.navigateTo({
			    url: '/pages/question/question4',
			  })
			},
			go5 () {
			  uni.navigateTo({
			    url: '/pages/question/question5',
			  })
			},
			go6 () {
			  uni.navigateTo({
			    url: '/pages/question/question6',
			  })
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6FA;
	}
	.bg {
		padding: 20rpx;
	}
	.title_ p {
		color: #154971;
	}
	.frame {
		background-color: #FFFFFF;
		border-radius: 15rpx;
	}
	.title_ {
		padding: 20rpx 20rpx 10rpx 20rpx;
		text-align: left;
		font-size: 45rpx;
		font-weight: 700;
	}
	.bd {
		padding: 0rpx 20rpx 0rpx 20rpx;
	}
	.type {
		margin: 20rpx;
		padding: 0rpx 20rpx 0rpx 20rpx;
	}
	.type image {
		border-radius: 10rpx;
		width: 600rpx;
		height: 230rpx;
	}
	.box {
		margin: 20rpx;
		float: left;
		border: 7rpx solid #002776;
		border-radius: 10rpx;
		width: 40%;
		height: 170rpx;
		// background-color: #ffff00;
	}
	.b1 {
		background: url(../../static/icons/老人.png) no-repeat;
		background-size: 50% 90%;
		background-position: 50rpx 60rpx;
	}
	.b2 {
		background: url(../../static/icons/女性.png) no-repeat;
		background-size: 50% 90%;
		background-position: 60rpx 90rpx;
	}
	.b3 {
		background: url(../../static/icons/禁止.png) no-repeat;
		background-size: 40% 60%;
		background-position: 65rpx 90rpx;
	}
	.b4 {
		background: url(../../static/icons/药品.png) no-repeat;
		background-size: 40% 60%;
		background-position: 73rpx 80rpx;
	}
	.b5 {
		background: url(../../static/icons/敏感.png) no-repeat;
		background-size: 40% 50%;
		background-position: 68rpx 95rpx;
	}
	.b6 {
		background: url(../../static/icons/健康.png) no-repeat;
		background-size: 30% 45%;
		background-position: 90rpx 100rpx;
	}
	.problem {
		margin-top: 5rpx;
		margin-left: 8rpx;
		font-weight: 700;
		font-size: 30rpx;
		color: #550000;
	}
	.describe {
		margin-top: 10rpx;
		margin-left: 10rpx;
		font-size: 27rpx;
		color: #aaaaff;
	}
	.clear {
		clear: both;
	}
	
</style>

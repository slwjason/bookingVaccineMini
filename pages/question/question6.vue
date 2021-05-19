<template>
	<view class="bg">
		<scroll-view class="frame" scroll-y="true">
			<view class="title_">
				<p>有慢性病能否接种？</p>
			</view>
			<view class="ima">
				<image src="../../static/imgs/慢性病.jpg" mode="widthFix"></image>
			</view>
			<view class="title_2">
				<p>相关文章</p>
			</view>
			<view class="information">
				<view class="item">
					<p class="p1">乳腺癌患者可以接种新冠疫苗吗？</p>
					<p class="p2">腾讯医典医学团队</p>
				</view>
			</view>
		</scroll-view>
	</view>		
</template>

<script>
</script>

<style lang="scss">	
	page {
		background-color:#F5F6FA;
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
		padding:20rpx;
		border-bottom: 1rpx solid #d8d8d8;
		text-align: left;
		font-size: 45rpx;
		font-weight: 700;
	}
	.ima {
		padding: 0rpx 20rpx 0rpx 20rpx;	
		border-bottom: 10rpx solid #d8d8d8;
	}
	.title_2 {
		padding:20rpx 30rpx;
		text-align: left;
		color: #154971;
		font-size: 40rpx;
		font-weight: 700;
	}
	.item {
		padding: 20rpx 30rpx 0 30rpx;
		border-bottom: 1px solid #C0C0C0;
		height: 120rpx;
	}
	.p1 {
		font-size: 35rpx;
		text-align: left;
		color: #262626;
	}
	.p2 {
		margin:20rpx 0;
		font-size: 20rpx;
		text-align: left;
		color: #D2D2D2;
	}
</style>
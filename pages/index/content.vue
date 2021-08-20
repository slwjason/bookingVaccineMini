<template>
	<view>
		<view class="content">
			<scroll-view class="contentChild" scroll-y="true">
				<uni-card class="card1" title="疫苗接种" thumbnail="../../../../static/icons/打针(2).png">
					<view class="description">
						<text>接种对象:18-59岁成年人，不限社会户籍</text>
					</view>
					<view class="process">
						<text>接种流程:</text>
					</view>
					<view class="process_img">
						<image src="../../static/imgs/流程.jpg" mode="widthFix"></image>
					</view>
					<button class="button" @click="booking">立即预约</button>
				</uni-card>
				<uni-card @click="map" class="card2">
					<view class="card2_top">
						<view class="title">
							<image src="../../static/icons/地图.png"></image>
							<text>接种地图</text>
						</view>
						<text class="tip">查看附件接种点</text>
					</view>
					<view class="card2_bottom">
						<image src="../../static/imgs/地址2.png"></image>
					</view>
				</uni-card>
			</scroll-view>


			<view class="bg" id='comment-content'>
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
						<swiper class="swiper" indicator-dots :autoplay="true" :interval="2000" circular>
							<swiper-item v-for="item in banners" :key="item.id">
								<image :src="item.img"></image>
							</swiper-item>
						</swiper>

					</view>
				</view>
			</view>



			<view class="bg">
				<view class="frame">
					<view class="title_">
						<p>全球疫苗研发进度</p>
					</view>
					<view class="progress">
						<image src="../../static/imgs/进度.png" mode="widthFix"></image>
					</view>
					<view class="source">
						<p>*数据来源：均来自WHO官方公布或官方媒体公布的最新信息</p>
					</view>
					<view class="title_">
						<p>动态追踪</p>
					</view>
					<view class="dynamic">
						<view class="item" v-for="item in news" :key="item">
							<u-parse :content="item.h2" @preview="preview" @navigate="navigate"></u-parse>
							<u-parse :content="item.img" @preview="preview" @navigate="navigate"></u-parse>
							<u-parse :content="item.info" @preview="preview" @navigate="navigate"></u-parse>
						</view>
						<view class="more" @click="more">查看更多...</view>
					</view>

				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		components: {
			uParse
		},
		props: {
			news: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				banners: [{
						id: 1,
						img: "../../static/imgs/疫苗类型.jpg"
					},
					{
						id: 2,
						img: "../../static/imgs/疫苗类型2.jpg"
					},
					{
						id: 3,
						img: "../../static/imgs/疫苗类型3.jpg"
					},

				],
				contentIndex: '',
				images: [],

			}
		},
		methods: {
			//查看更多
			more() {
				let href = 'https://search.sina.com.cn/?q=%E6%96%B0%E5%86%A0&from=channel&ie=utf-8&c=news'
				uni.navigateTo({
					url: '/pages/goNews/goNews?url=' + href
				})
			},
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				//比如点击a标签，打开某个webview并传输url  
				uni.navigateTo({
					url: '/pages/goNews/goNews?url=' + href
				})
				// do something
			},
			//问题板块跳转
			go1() {
				uni.navigateTo({
					url: '/pages/question/question1',
				})
			},
			go2() {
				uni.navigateTo({
					url: '/pages/question/question2',
				})
			},
			go3() {
				uni.navigateTo({
					url: '/pages/question/question3',
				})
			},
			go4() {
				uni.navigateTo({
					url: '/pages/question/question4',
				})
			},
			go5() {
				uni.navigateTo({
					url: '/pages/question/question5',
				})
			},
			go6() {
				uni.navigateTo({
					url: '/pages/question/question6',
				})
			},
			//预约
			booking() {
				uni.navigateTo({
					url: '/pages/booking/booking',
				})
			},

			//map
			map() {
				uni.navigateTo({
					url: '/pages/vaccina/vaccina?planLocate=' + this.planLocate,
				})
			}

		},

	}
</script>
<style lang="scss">
	page {
		background-color: #F5F6FA;
	}

	.bg {
		padding: 20rpx;
		background-color: #F5F6FA;
	}

	.title_ p {
		color: #154971;
	}

	.frame {
		padding: 20rpx 20rpx 10rpx 20rpx;
		background-color: #FFFFFF;
		border-radius: 15rpx;
	}

	.title_ {
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

	.description text {
		color: #3F536E;
		font-size: 28rpx;
	}

	.process text {
		color: #3F536E;
		font-size: 28rpx;
	}

	.process {
		margin: 20rpx 0 15rpx 0;
	}

	.process_img {
		height: 190rpx;
	}

	.process_img image {
		width: 100%;
	}

	.content {
		background: #fff;
		position: relative;
		height: 100%;
		width: 100%;
	}

	.contentChild {
		background-color: #F5F6FA;
		// min-height: 1500rpx;	
	}

	.content .contentChild .card1 .title {
		font-size: 20px;
		font-weight: bold;
	}

	.contentChild .card1 .button {
		background-color: #3D8EF2;
		width: 90%;
		color: #204430;
	}

	.contentChild .card2 .title {
		display: block;
		font-size: 16px;
		// font-weight: bold;
		color: #333333;
	}

	.contentChild .card2 .title image {
		padding: 0 8px 0 0;
		width: 20px;
		height: 20px;
	}

	.contentChild .card2 .tip {
		padding-left: 25px;
		font-size: 12px;
	}

	.card2_top {
		display: inline-block;
		width: 50%;
	}

	.card2_bottom {
		display: inline-block;
		width: 50%;
		height: 127rpx;
	}

	.card2_bottom image {
		width: 55%;
		height: 80%;
	}

	.progress {
		padding: 10rpx 0 0 0;
		width: 100%;
	}

	.progress image {
		width: 100%;
	}

	.source {
		margin-bottom: 30rpx;
	}

	.source p {
		font-size: 15rpx;
		color: #C8C8C8;
	}

	.dynamic {
		padding: 0 10rpx;
	}

	.item {
		border-bottom: 1px solid #ccc;
	}

	.item .time {
		margin: 18rpx 0 12rpx 0;
	}

	.item .time p {
		font-size: 28rpx;
		color: #808080;
	}

	.news {
		border-radius: 12rpx;
		background-color: #f5f5f5;
	}

	.news_title {
		padding: 20rpx 18rpx;
		font-size: 37rpx;
	}

	.news_msg {
		padding: 0 18rpx;
		font-size: 30rpx;
		color: #7D7D7D;
	}

	.news_from {
		padding: 20rpx 18rpx;
		font-size: 27rpx;
	}

	.item {
		width: 100%;
		margin: 10px;
	}

	.fgray_time {
		color: #00BFFF;
		font-size: 10px;
		text-align: right;
		margin: 5px;
	}

	.r-img {
		width: 80%;
	}

	.r-img .left_img {
		display: block;
		width: 80%;
	}

	.r-info {
		margin: 10px;
		color: #154971;
		font-size: 12px;
	}

	.more {
		font-size: 12px;
		color: #838383;
		text-align: right;
	}
	
</style>

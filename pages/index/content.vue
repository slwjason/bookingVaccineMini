<template>
	<view>
		
		<view class="content">
		
			
						<scroll-view class="contentChild" scroll-y="true">
							<uni-card class="card1" title="疫苗接种" thumbnail="../../../../static/icons/打针(2).png" >
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
									<image src="../../static/imgs/地图2.png"></image>
								</view>
							</uni-card>
						</scroll-view>
					
			
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
								<view class="item">
									<view class="time">
										<p>05.09 11:41</p>
									</view>
									<view class="news">
										<view class="news_title">
											中国疾控中心主任高福：中国明年或实现全民免疫
										</view>
										<view class="news_msg">
											5月9日，中科院院士、中国疾病预防控制中心主任高福通过视频接受日本知名智库、民间非营利组织言论NPO代表工藤泰志采访时表示，预计到明年，中国将有9-10亿人接种新冠疫苗，可达到实现全民免疫的标准。
										</view>
										<view class="news_from">
											来源： 每日经济新闻
										</view>
									</view>
								</view>
								<view class="item">
									<view class="time">
										<p>03.23 17:01</p>
									</view>
									<view class="news">
										<view class="news_title">
											不用打针！这款吸入用新冠疫苗获批临床试验
										</view>
										<view class="news_msg">
											记者3月23日获悉，康希诺生物在港交所发布公告称，其吸入用重组新型冠状病毒疫苗获得了国家药品监督管理局的药物临床试验批件。
										</view>
										<view class="news_from">
											来源： 北京日报
										</view>
									</view>
								</view>
							
							</view>
						</view>
					</view>	
			
		
		</view>
	</view>
</template>
<script>

	export default {
	
		data() {
			return {
			
				
				contentIndex: '',
				images: []
			}
		},
		methods: {
			//问题板块跳转
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
			//预约
			booking(){
				uni.navigateTo({
				  url: '/pages/booking/booking',
				})
			},
			
			//map
			map(){
				  uni.redirectTo({
				    url: '/pages/vaccina/vaccina?planLocate='+this.planLocate,
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
	.content{
		background: #fff;
		position: relative;height: 100%;width: 100%;
	}

	.contentChild{
		background-color: #F5F6FA;
		// min-height: 1500rpx;	
	}
	.content .contentChild .card1 .title{
		font-size: 20px;
		font-weight: bold;
	}
	.contentChild .card1 .button{
		background-color: #3D8EF2;
		width: 90%;
		color: #204430;
	}
	.contentChild .card2 .title{
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
	.contentChild .card2 .tip{
		padding-left: 25px;
		font-size: 12px;
	}
	.card2_bottom image {
		width: 95%;
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
</style>

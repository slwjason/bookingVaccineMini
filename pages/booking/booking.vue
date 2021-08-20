<template>
	<view>
		<view class="body">
			<view class="header">
				<!-- @click="zizhu" -->
				<fever-popup ref="popupRef" @btnCallBack="onPopupBtn"></fever-popup>
				<view class="buffet buffet_left" @click="zizhu">
					<view class="left">
						<uni-badge text="1" type="warning" size="small"></uni-badge>
						<text class="label">自助建档</text>
						<view class="explain">建立临时档案后预约</view>
					</view>
					<view class="right">
						<image src="../../static/imgs/在线建档.png" mode="heightFix">
					</view>
				</view>
				<view class="buffet file_box buffet_right">
					<view class="left" @click="zhengshi">
						<uni-badge text="2" type="warning" size="small"></uni-badge>
						<text class="label">绑定正式档案</text>
						<view class="explain">完成接种后请绑定</view>
					</view>
					<view class="right">
						<image src="../../static/imgs/绑定管理.png" mode="heightFix"></image>
					</view>
				</view>
			</view>
			<scroll-view class="lists" scroll-y="true">
				<text class="titile">成人档案列表</text>
				<uni-card v-for="item in archives" :key="item.id" class="card" @click="details(item.id)">
					<view class="item_left">
						<text class="name">{{item.name}}</text>
						<text class='sex' :style="item.sex === '男' ? boy : girl">{{item.sex}}</text>
						<text class="age">{{item.age}}</text>
						<view class="idView">
							<text class="idCard">证件号:{{item.idCard}}</text>
							<text class="state">{{item.status}}</text>
						</view>
					</view>
					<view class="item_right">></view>
				</uni-card>
			</scroll-view>
			<view class="footer">
				<p>温馨提示：</p>
				<view class="f_msg">
					1、“自助建档”用于18岁以上成人首次疫苗接种前自助建立临时个人档案,减少现场等待时间。
				</view>
				<view class="f_msg">
					2、资助建立的临时档案预约后不可删除，在接种单位完成疫苗接种后，可绑定正式预防接种档案。
				</view>
				<view class="f_msg">
					3、非首次接受疫苗接种服务的人群，可直接绑定正式档案。
				</view>
				<view class="f_msg">
					4、已绑定正式档案的人群，可直接于个人档案中使用在线预约等服务功能。
				</view>
				<view class="f_msg">
					5、一个微信账号最多支持自助建立5个成人临时档案。
				</view>
				<view class="f_msg">
					6、您使用过程中，遇到任何问题，请致电：13055889565。
				</view>
			</view>
		</view>
		<!-- 	<view class="">
			
			<view class="viewItem">标题+内容+选择器+按钮</view>
		</view> -->
	</view>
</template>

<script>
	var popupRef;
	import feverPopup from '@/components/hongren-popup/hongren-popup.vue';
	export default {
		components: {
			feverPopup
		},
		data() {
			return {
				// 4、直接在html中v-for循环，采用块级元素（div、p、li等）显示即可
				str: '以下隐私协议是本自助建档服务对用户隐私保护的许诺，请您务必仔细阅读本协议，以了解我们关于管理您个人信息的情况。本隐私协议的全部条款属于本软件用户服务协议的重要部份之一。为了给您提供更准确、 更有针对性的服务， 本软件可能会以如下方式， 使用您提交的个人信息。 但本软件会以高度的勤勉义务对待这些信息， 在未征得您许可的情况下， 不会将这些信息对外公开或向第三方提供。一、 保有您提供的信息 本软件会在您自愿选择服务或提供信息的情况下收集您的个人信息， 并将这些信息进行整合， 以便向您提供更好的用户服务。 请您在登记用户信息时仔细阅读该条款， 信息登记时需详尽及准确的提供个人资料， 并不断更新注册资料， 符合及时、 详尽准确的要求。 该信息将用于用户“ 疫苗接种” 登记服务。 如果因登记信息不真实而引起的问题， 由您自行承担相应的后果。 因黑客行为或用户的保管疏忽导致个人信息遭他人非法使用， 本软件不承担责任 二、 保有您的使用记录 当您使用本软件的服务时， 服务器会自动记录一些信息， 包括手机型号、 IP地址等。 在如下情况下， 本软件会遵照您的意愿或法律的规定披露您的个人信息， 由此引发的问题将由您个人承担：（ 1） 事先获得您的授权；（ 2） 只有透露你的个人资料， 才能提供你所要求的产品和服务；（ 3） 根据有关的法律法规要求；（ 4） 按照相关政府主管部门的要求；（ 5） 为维护本软件的合法权益。（ 6） 您同意让第三方共享资料。（ 7） 我们发现您违反了本软件的服务条款或使用规定。（ 8） 我们需要向代表我们提供产品或服务的公司提供资料（ 除非我们另行通知你， 否则这些公司无权使用你的身份识别资料）。 三、 本《 隐私政策》 不适用于以下情况： （ 1） 通过我们的服务而接入的第三方服务（ 包括任何第三方网站） 收集的信息。 本政策仅适用于我们所收集的信息， 并不适用于任何第三方提供的服务或第三方的信息使用规则， 我们对任何第三方使用由您提供的信息不承担任何责任；（ 2） 通过在我们服务中进行广告服务的其他公司或机构所收集的信息。 四、 隐私权政策的修订 我们可能适时修订本政策的条款， 修订政策也是构成本政策的一部分。 如修订政策造成您在本政策下权利的实质减少， 我们将在修订生效前通过在主页上显著位置提示或向您发送电子邮件或以其他方式通知您。 在该种情况下， 若您继续使用我们的服务， 即表示同意受经修订的本政策的约束。 ',
				archives: [],
				openId: '',
				boy:'background-color:#aaaaff',
				girl:'background-color:pink'
			}
		},
		mounted() {},
		onLoad(options) {},
		onReady() {
			popupRef = this.$refs.popupRef;
		},
		created() {},

		onLoad() {

			this.getUserInfo()

		},
		methods: {
			//下拉刷新
			   onPullDownRefresh() {
					this.getUserInfo()
			    setTimeout(() => {
			     uni.stopPullDownRefresh()
				   this.getUserInfo()
			    }, 1000);
			   },
			//身份证加工
			starReplace(str, s, e) {
						 
						        if (!str) return str;
						 
						        var _k =  !!e&&e != 0  ? str.substring(s, e) : str.substring(s);
						 
						        var _v = "";
						 
						        for (var i = 0; i < _k.length; i++)  _v += "*";        
						 
						        return str.replace(_k, _v);
						 
						    },
			onPopup(i) {
				if (i == 8) {
					popupRef.type = 'def';
					popupRef.mark = true;
					popupRef.checked = {
						state: false
					};
					popupRef.info = {
						title: '用户隐私条款',
						centent: [
							this.str
						],
						btn: ['确认']
					};
				}
			},
			onPopupBtn(item) { //组件回调
				console.log(item)
			},
			////获取微信用户信息
			getUserInfo() {
				let that = this;
				wx.getStorage({
					key: 'opid_sessionKey',
					success: function(res) {
						that.openId = res.data.openid
						that.findArchives()
					},
					fail: function(res) {}

				})

			},
			details(id) {
				uni.navigateTo({
					url: '/pages/booking/details?id=' + id,
				})
			},
			async zizhu() {
				if (this.archives.length < 10) {
					this.onPopup(8)
					
				} else {
					wx.showToast({
						title: '超过最大建档数',
						icon: 'error',
						duration: 2000
					})
				}

			},
			async zhengshi () {
			      uni.navigateTo({
			     url: '/pages/booking/archivesFormal',
			      })
			   },
			//查找当前微信用户建档记录
			//提交建档数据
			async findArchives() {
				let that = this
				const result = await this.$myRuquest({
					url: '/archives/findArchives',
					method: 'POST',
					data: {
						wxId: that.openId,
					},
				})
				that.archives = result.data.data
				for (var i = 0; i < that.archives.length; i++) {
					that.archives[i].idCard = that.starReplace(that.archives[i].idCard,3,17)
				}
			},
		},


	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6FA;
	}

	template {
		position: relative;
	}

	.header {
		width: 100%;
		height: 100rpx;
		
	}

	.header::after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	
	.header .buffet {
		margin-top: 10rpx;
		width: 340rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 8rpx;

	}

	.header .buffet .left {
		width: 230rpx;
		height: 100rpx;
	}

	.header .buffet .left text {
		font-size: 15px;
	}

	.header .buffet .left view {
		margin: 2px;
		// font-size: 8px;
	}

	.explain {
		font-size: 25rpx;
		color: #7A7A7A;
	}

	.buffet_left {
		float: left;
		padding: 0 10rpx;
	}

	.buffet_right {
		float: right;
		padding: 0 10rpx;
	}

	.card {
		height: 160rpx;
	}

	.lists {
		margin-top: 10px;
		height: 784rpx;
	}

	.lists .titile {
		font-size: 27rpx;
		margin-left: 20px;
	}

	.card {
		width: 90%;

	}

	.idView {
		padding-top: 20rpx;
	}

	.state {
		margin-left: 20rpx;
		padding: 0 5rpx;
		background-color: #aaaaff;
		border-radius: 10rpx;
		color: #900000;
	}

	.idCard {
		font-size: 20rpx;
		color: #707070;
	}

	.sex {
		margin: 0 18rpx;
		padding: 0 5rpx;
		border-radius: 10rpx;
		color: #00557f;
	}

	.right image {
		// width: 30%;
		height: 80%;
	}

	.item_left {
		// width: 550rpx;
		float: left;
	}

	.item_right {
		float: right;
		padding-top: 18rpx;
		height: 100%;
		font-size: 50rpx;
	}

	.footer {
		position: absolute;
		bottom: 30rpx;
		margin: 0 40rpx;
	}

	.footer p {
		color: #aa0000;
		font-size: 20rpx;
	}

	.f_msg {
		color: #b5b5b5;
		font-size: 18rpx;
	}

	.viewItem {
		position: relative;
		width: 100%;
		padding: 20rpx;
		margin-top: 50rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		font-weight: 300;
		color: #FFFFFF;
		background-color: rgba(212, 201, 240, 0.8);
	}
	.buffet::after {
	  content: "";
	  display: block;
	  height: 0;
	  clear: both;
	  visibility: hidden;
	 }
	 .left {
	  float: left;
	 }
	 .right {
	  float: left;
	  padding-top: 5px;
	  height: 50px;
	  width: 55px;
	 }
</style>

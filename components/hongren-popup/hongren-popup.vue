<template name="fever-popup">
	<view class="" style="z-index: 100;">
		<view :class="(type?'fever_popupShow':'fever_popupHide')+' fever_popup fever_flex'" id="fever_popup">
			<view v-if="type" :style="'opacity: '+(mark?0.3:0)+';'" class="'fever_popup_mark'" @click.stop.prevent="popupClose" ></view>
			<view v-if="type" class="fever_popup_def fever_flex" id="fever_popup_def" style="background-color:#89B1E8 ">
				<!-- <view v-if="type=='def'" class="fever_popup_def fever_flex" id="fever_popup_def"> -->
				<view v-if="info && info.title && info.title.length>0" class="fever_popup_def_header line_clamp1">{{info.title}}</view>
				<view v-if="info && info.centent && info.centent.length>0" class="fever_popup_def_body fever_flex">
					<view v-for="(item,index) in info.centent" :key="index">{{item}}</view>
				</view>
				<view class="fever_popup_checkbox" v-if="checked">
					<checkbox-group @change="checkboxChange">
						<label>
							<checkbox :checked="checked.state" :color="fun.rgb(0.8)" style="transform:scale(0.7)" />
							<text>我已仔细阅读品牌的隐私政策及法律条款，点击【授权登录】即代表您已阅读并接受前述条款</text>
							<!-- <navigator class="fever_underline" url="#">隐私政策及法律条款，点击【授权登录】即代表您已阅读并接受前述条款</navigator> -->
							<!-- <text>及</text> -->
							<!-- <navigator class="fever_underline" url="#">法律条款</navigator> -->
							<!-- <text>，点击【授权登录】即代表您已阅读并接受前述条款</text> -->
						</label>
					</checkbox-group>
				</view>
				<view class="fever_popup_def_footer" v-if="info && info.btn.length>0">
					<block v-for="(item,index) in info.btn" :key="index">
						<view v-if="item==1 || item=='取消' || item=='关闭'" class="fever_popup_def_footer_item fever_cancel" @click="onBtn(item)">取消</view>
						<view v-else-if="item==2 || item=='确认'" class="fever_popup_def_footer_item fever_confirm" @click="onBtn(item)">确认</view>
						<view v-else-if="item==3 || item=='分享'" class="fever_popup_def_footer_item fever_share" @click="onBtn(item)">分享</view>
						<view v-else-if="item==4 || item=='收藏'" class="fever_popup_def_footer_item fever_collection" @click="onBtn(item)">收藏</view>
						<view v-else class="fever_popup_def_footer_item fever_other" @click="onBtn(item)">{{item}}</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>
<script module="fun" lang="wxs">
	function rgb(a){//rgb颜色随机
		if(!a){
			a=0.5;
		}
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		var rgb = 'rgba('+r+','+g+','+b+','+a+')';
		return rgb;
	}
	module.exports = {
		rgb:rgb
	}
</script>
<script>
	export default {
		name: "fever-popup",
		props: {
			p_checked:{
				type: [Number, String, Boolean],
				default: false
			},
			p_type: {
				type: [Number, String, Boolean],
				default: false
			},
			p_mark: {
				type: [Number, String, Boolean],
				default: false
			},
			p_info: {
				type: [Number, String, Boolean, Array, Object],
				default: false
			}
		},
		data() {
			return {
				type: this.p_type,//控制弹窗模板、控制弹窗显示隐藏true/false
				mark: this.p_mark,//控制遮罩层是否显示隐藏true/false
				info: this.p_info,//弹出内容、根据type项有些centent为必填项
				checked:this.p_checked//
			}
		},
		//组件生命周期
		created: function(e) {
			console.log('创建弹窗')
		},
		methods: {
			checkboxChange(e) {
				this.$set(this.checked, 'state', !this.checked.state);
			},
			onBtn(item){
				if(this.checked && item==2 || item=='确认'){
					if(this.checked.state){
						uni.navigateTo({
						               url: '/pages/booking/archives',
						           });
						this.initDataTap();
						this.$emit('btnCallBack',item)
					}else{
						uni.showToast({title: "你有选项未同意",icon: "none",duration: 1500});
					}
				}else{
					uni.showToast({title: "点击了"+item,icon: "none",duration: 1500});
					this.initDataTap();
					this.$emit('btnCallBack',item)
				}
			},
			onCancel() {uni.showToast({title: "点击了取消",icon: "none",duration: 1500})},
			onConfirm() {
				 uni.navigateTo({
				                url: '/pages/booking/archives',
				            });

			},
			onShare() {uni.showToast({title: "点击了分享",icon: "none",duration: 1500})},
			onCollection() {uni.showToast({title: "点击了收藏",icon: "none",duration: 1500})},
			moveHandle() {},
			popupClose() {
				this.initDataTap();
				return '其它区域';
			},
			success: function(e) {},
			error: function(e) {},
			setDataTap: function(e) {},
			getDataTap: function(e) {},
			initDataTap: function(e) {
				this.type = false;
				this.mark = false;
				this.info = false;
				this.checked = false;
			}
		}
	}
</script>
<style scoped>
	/* fever_popup_def */
	.fever_popup_def_footer_item {
		position: relative;
		flex: 1;
		padding: 5rpx 20rpx;
		border-left: 1rpx dashed #e7e7e7;
	}

	.fever_popup_def_footer_item:nth-child(1) {
		border: 0;
	}

	.fever_popup_def_footer {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: nowrap;
		padding: 10px 0;
		font-size: 34rpx;
	}
	
	.fever_popup_checkbox{
		position: relative;
		width: 100%;
		font-size: 30rpx;
		font-weight: 300;
		padding: 5rpx 15rpx;
		text-align: left;
	}

	.fever_popup_def_body>view {
		width: 100%;
		padding: 5rpx;
		text-indent: 1em;
	}

	.fever_popup_def_body {
		position: relative;
		min-height: 100rpx;
		max-height: 300rpx;
		overflow-y: auto;
		width: 100%;
		font-size: 30rpx;
		font-weight: 300;
		padding: 5rpx 15rpx;
		text-align: left;
		flex-wrap: wrap;
	}

	.fever_popup_def_header {
		position: relative;
		font-weight: bold;
		padding: 15rpx;
		width: 100%;
		font-size: 40rpx;
	}

	.fever_popup_def {
		position: absolute;
		width: 500rpx;
		min-height: 200rpx;
		background-color: #ff986f;
		border-radius: 20rpx;
		flex-wrap: wrap;
		padding: 10rpx 10rpx 0 10rpx;
		color: #ffffff;
		z-index: 100;
	}

	/*  */
	.fever_popup_mark {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #000000;
		opacity: .3;
		z-index: 99;
	}

	.fever_popup {
		position: fixed;
		width: 100vw;
		height: 100vh;
		text-align: center;
		font-size: 40rpx;
		transition: all 1s;
		overflow: hidden;
		z-index: 98;
	}

	.fever_popupShow {
		transform: scale(1);
		opacity: 1;
		/* border-radius: 0rpx; */
	}

	.fever_popupHide {
		transform: scale(0);
		opacity: 0;
		/* border-radius: 100vw; */
	}

	.fever_flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fever_cancel {
		color: #767676;
	}

	.fever_confirm {
		color: #d8c4ff;
	}

	.fever_share {
		color: #55aaff;
	}
	.fever_other{
		color: #5e585b;
	}
	.fever_collection{
		color: #ffaa00;
	}
</style>


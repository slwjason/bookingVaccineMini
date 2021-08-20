<template>
	<view>
		<uni-card>
			<view class="header">
				<view class="left">
					<view class="left_top">
						<text class="name">{{archives.name}}</text>
						<text class="sex" :style="archives.sex === '男' ? boy : girl">{{archives.sex}}</text>
						<text class="age">{{archives.age}}岁</text>
					</view>
					<view class="left_buttom">
						<text class="idCard">证件号  {{archives.idCard}}</text>
					</view>
				</view>
				<view class="right">
					<button @click="update(archives.id)" style="border-radius: 20px;">修改信息</button>
				</view>
			</view>
			<view class="main">
				<view class="item">
					<text class="brith item_text">出生年月</text>
					<text class="item_text item_text_right">{{archives.brithDay}}</text>
				</view>
				<view class="item">
					<text class="phone item_text">手机号码</text>
					<text class="item_text item_text_right">{{archives.phone}}</text>
				</view>
				<view class="item">
					<text class="address item_text">详细地址</text>
					<text class="item_text item_text_right">{{archives.address}}</text>
				</view>
			</view>
			
		</uni-card>
		<view class="footer">
			<button @click="toRecord(archives.id)" type="primary"  style="display: inline; width: 466rpx;font-size: 14px;">查看预约记录</button>
			<button  @click="booking(archives.id)"  style="display: inline; width: 254rpx; background-color: #007AFF;font-size: 14px; color: #fff;">我要预约</button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				archives:{},
				boy:'background-color:#aaaaff',
				girl:'background-color:pink'
			};
		},
		//获取页面传递的id
		onLoad(options){
			console.log(options)
			this.id = options.id
			//将预约人的id存如storage
			wx.setStorage({
				key: 'archivesId',
				data: options.id
			})
			this.getArchives()
		},
	
		methods:{
			//身份证加工
		 starReplace(str, s, e) {
			 
			        if (!str) return str;
			 
			        var _k =  !!e&&e != 0  ? str.substring(s, e) : str.substring(s);
			 
			        var _v = "";
			 
			        for (var i = 0; i < _k.length; i++)  _v += "*";        
			 
			        return str.replace(_k, _v);
			 
			    },
			//获取点击的档案用户信息
			async getArchives(){
					
					let that = this
					const result = await this.$myRuquest({
						url: '/archives/getArchives',
						method:'POST',
						data:{
							id:that.id,
						},
					})
					that.archives = result.data.data[0]
					that.archives.idCard = that.starReplace(that.archives.idCard,3,17)
				},
			//修改档案信息
			async update(id){
				uni.navigateTo({
				  url: '/pages/booking/archives?id='+id,
				})
			},
			//修改档案信息
			async booking(id){
				uni.navigateTo({
				  url: '/pages/booking/unit?id='+id,
				})
			},
			toRecord(id){
			    uni.navigateTo({
			      url: '/pages/record/record?id='+id
			    })
			   }
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6FA;
	}
	.header{
		
		width: 100%;
		height:100rpx;
		border-bottom: 1px solid #555555;
	}
	.header:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
	        content: "";
	        display: block;
	        height: 0;
	        clear:both;
	        visibility: hidden;
	    }
	  
	.left{
		float: left;
		width: 450rpx;
		
	}
	.right{
		button{
			font-size: 12px;
		}
		float: right;
		width: 170rpx;
	}
	.sex{
		width:40rpx;
		text-align: center;
		display: inline-block;
		
		color: #00557f;
		margin: 0px 10px;
		font-size: 14px;
	}
	.idCard{
		display: inline-block;
		font-size: 12px;
		color: #999999;
	}
	.item{
		margin: 10px 0px;
		
	}
	.item_text{
		font-size: 12px;
		color: #555555;
		
	}
	.item_text_right{
		margin: 0px 10px;
	}
	.footer{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 75rpx;
		background: #fff;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	
		
</style>

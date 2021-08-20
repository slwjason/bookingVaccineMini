<template>
	<view>
		<view class="title">
			<p>
				预约接种记录
			</p>
		</view>
		<view class="title_2">
			<p>
				(Vaccination Record)
			</p>
		</view>
		<view class="msg">
			<view class="msg_item">
				<view class="left">
					<p>证件类型</p>
					<p>ID Type</p>
				</view>
				<view class="right">
					<p>身份证</p>
				</view>
			</view>
			<view class="msg_item">
				<view class="left">
					<p>证件号</p>
					<p>ID No.</p>
				</view>
				<view class="right">
					<p>{{record.idCard}}</p>
				</view>
			</view>
			<view class="msg_item">
				<view class="left">
					<p>受种者姓名</p>
					<p>Name</p>
				</view>
				<view class="right">
					<p>{{record.archivesName}}</p>
				</view>
			</view>
			<view class="msg_item">
				<view class="left">
					<p>性别</p>
					<p>Gender</p>
				</view>
				<view class="right">
					<p>{{record.sex}}</p>
				</view>
			</view>
		</view>
		<view class="tab">
			<uni-table>
				<uni-tr class="tab_th">
					<uni-th align="center">疫苗名称</uni-th>
					<uni-th align="center">预约日期</uni-th>
					<uni-th align="center">疫苗批号</uni-th>
					<uni-th align="center">生产企业</uni-th>
					<uni-th align="center">接种单位</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td>{{record.vaccineName}}</uni-td>
					<uni-td>{{record.createDate}}</uni-td>
					<uni-td>{{record.lot}}</uni-td>
					<uni-td>{{record.manufacturer}}</uni-td>
					<uni-td>{{record.hospitalName}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
		export default {
			data(){
				return{
					archivesId:'',
					record:{}
				}
			},
			onLoad(options) {
				console.log(options)
				if(options.record!='' && options.record!=null){
					this.archivesId = options.record
					this.getRecord()
				}
				
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
				async getRecord() {
					let that = this
					const result = await this.$myRuquest({
						url: '/appointment/getRecord',
						method: 'POST',
						data: {
							archivesId: that.archivesId,
						},
					})
					that.record = result.data.data
					that.record.idCard = that.starReplace(that.record.idCard,3,17)
				},
			}
		}
</script>

<style lang="scss">
	.title {
		margin-top: 10px;
	}
	.title p {
		text-align: center;
		font-weight: 700;
		font-size: 16px;
		color: #2F3130;
	}
	.title_2 p {
		text-align: center;
		font-size: 15px;
		color: #535353;
	}
	.msg {
		margin: 15px 15px 0 15px;
		padding: 5px 0;
		border-top: #f0f0f0 1px solid;
		border-bottom: #f0f0f0 1px solid;
	}
	.msg_item {
		margin-bottom: 5px;
		width: 100%;
		height: 40px;
	}
	.left {
		float: left;
		width: 80px;
	}
	.right {
		float: left;
	}
	.msg_item .left p {
		line-height: 20px;
		color: #9C9DA2;
		font-size: 13px;
	}
	.msg_item .right p {
		line-height: 40px;
		color: #474B4A;
		font-size: 13px;
	}
	.tab {
		margin: 0 15px;
	}
	.tab uni-table {
		width: 100%;
	}
	.tab_th {
		background-color: #F1F9FF;
	}
	.uni-table-th[data-v-511e81f9] {
		color: #93c1ca;
		font-size: 13px;
	}
	.uni-table-td[data-v-321f8e79] {
		font-size: 13px;
	}
</style>

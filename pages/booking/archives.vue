<template>
	<view>
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group title="基本信息" top="0">
				<uni-forms-item name="name" required label="姓名">
					<input type="text" v-model="formData.name" class="uni-input-border" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item name="idCard" required label="身份证号">
					<input type="text" v-model="formData.idCard" @blur="goAgeSex" class="uni-input-border"
						placeholder="请输入身份证号" />
				</uni-forms-item>
				<!-- 使用原生input，需要绑定binddata -->
				<uni-forms-item name="age" label="年龄">
					<input type="text" v-model="formData.age" class="uni-input-border" placeholder="请输入年龄"
						disabled="false" />
				</uni-forms-item>
				<uni-forms-item name="sex" label="性别">
					<input type="text" v-model="formData.sex" class="uni-input-border" placeholder="请输入性别"
						disabled="false" />
				</uni-forms-item>
				<uni-forms-item name="brithDay" label="出生年月">
					<input type="text" v-model="formData.brithDay" class="uni-input-border" placeholder="请输入出生年月"
						disabled="false" />
				</uni-forms-item>
				<uni-forms-item name="phone" label="手机号" required>
					<input type="text" v-model="formData.phone" class="uni-input-border" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="email" label="qq邮箱" required>
					<input type="text" v-model="formData.email" class="uni-input-border" placeholder="请输入qq邮箱" />
				</uni-forms-item>
				<uni-forms-item name="address" label="详细地址" required>
					<input type="text" v-model="formData.address" class="uni-input-border" placeholder="请输入详细地址" />
				</uni-forms-item>
				<uni-forms-item name="isIll" label="有无慢性病" labelWidth="100">
					<view class="uni-list-cell uni-list-cell-pd">
						<switch :checked="formData.isIll" @change="changeIsIll" />
					</view>
				</uni-forms-item>
				<uni-forms-item name="isWill" label="是否接受接种" labelWidth="100">
					<view class="uni-list-cell uni-list-cell-pd">
						<switch :checked="formData.isWill" @change="changeIsWill" />
					</view>
				</uni-forms-item>
			</uni-group>
			<view style="height: 200rpx;"></view>
			<view class="footer">
				<button @click="submitForm('form')" type="primary"
					style="display: inline; width: 466rpx;font-size: 14px;">提交</button>
				<button @click="resetForm"
					style="display: inline; width: 254rpx; background-color: #007AFF;font-size: 14px;">重置</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		onLoad(optipns) {
			if (optipns) {
				this.updateId = optipns.id
				this.getArchives()
			}
			this.getUserInfo()
		},
		data() {
			return {
				updateId: '',
				formData: {
					email: '',
					name: '',
					age: '',
					sex: '',
					idCard: '',
					openId: '',
					phone: '',
					address: '',
					brithDay: '',
					isIll: false,
					isWill: true
				},

				show: false,
				rules: {
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名'
							},
							{
								minLength: 1,
								maxLength: 15,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					idCard: {
						rules: [{
								required: true,
								errorMessage: '请输入身份证号'
							},
							
						]
					},
					age: {
						rules: [{
								required: true,
								errorMessage: '请输入年龄'
							},
							{
								format: 'int',
								errorMessage: '年龄必须是数字'
							},
							{
								minimum: 18,
								maximum: 30,
								errorMessage: '年龄应该大于 {minimum} 岁，小于 {maximum} 岁'
							}
						]
					},
					email: {
						rules: [{
								required: true,
								errorMessage: '请输入邮箱'
							},
							{
								format: 'email',
								errorMessage: '请输入正确的邮箱地址'
							},
						]
					},
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号'
							},
							{
								format: 'int',
								errorMessage: '手机号码必须是数字'
							},

						]
					},
					address: {
						rules: [{
								required: true,
								errorMessage: '请输入详细地址'
							},

						]
					},
				}
			}
		},
		methods: {
			
			changeIsIll() {
				this.formData.isIll = !this.formData.isIll
			},
			changeIsWill() {
				this.formData.isWill = !this.formData.isWill
			},
			////获取微信用户信息
			getUserInfo() {
				let that = this
				wx.getStorage({
					key: 'opid_sessionKey',
					success: function(res) {
						console.log(res)
						that.formData.openId = res.data.openid
					},
					fail: function(res) {}

				})

			},
			goAgeSex() {
				if (this.formData.idCard == '') {
					return
				} else {
					if(!this.checkIdCard(this.formData.idCard)){
								uni.showToast({
									icon:"error",
									title: '身份证号错误'
								})
					}else{
						//获取输入身份证号码
						var UUserCard = this.formData.idCard;
						//获取出生日期
						this.formData.brithDay = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" +
							UUserCard.substring(12, 14);
						//获取性别
						if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
							this.formData.sex = '男'
							//是男则执行代码 ...
						} else {
							this.formData.sex = '女'
							//是女则执行代码 ...
						}
						//获取年龄
						var myDate = new Date();
						var month = myDate.getMonth() + 1;
						var day = myDate.getDate();
						var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
						if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(
								12, 14) <= day) {
							age++;
						}
						this.formData.age = age
						//年龄 age
					}
				
				}

			},
			change(name, value) {
				this.formData.checked = value
				this.$refs.form.setValue(name, value)
			},
			checkIdCard(idCard){
				if(idCard.length==18){
					var idCard_string = JSON.stringify(idCard);
					var spstr = idCard_string.split("");
					var x = spstr[spstr.length - 2];
					console.log(spstr)
					if (x === "x") {
						uni.showToast({
							icon:"error",
							title: '身份证号最后一位X为大写'
						})
						return false;
					}
					var reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
				var arrSplit = idCard.match(reg);  //检查生日日期是否正确，value就是身份证号
				if (!arrSplit) {
					uni.showToast({
						icon:"error",
						title: '身份证号格式有问题，请重新输入'
					})
		
					return false;
				}
				var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
				var bGoodDay;
				bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
				if (!bGoodDay) {
					uni.showToast({
						icon:"error",
						title: '输入的身份证号里出生日期不对！'
					})
		
					return false;
				} else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					var valnum;
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
					var nTemp = 0, i;
					for (i = 0; i < 17; i++) {
						nTemp += idCard.substr(i, 1) * arrInt[i];
					}
					valnum = arrCh[nTemp % 11];
					if (valnum != idCard.substr(17, 1)) {
						uni.showToast({
							icon:"error",
							title:"18位身份证的校验码不正确！应该为：" + valnum
						})
						return false;
					}
					return true;
				}
			}
			},
			//提交建档数据
			async archives(res) {
				console.log(res)
				if(!this.checkIdCard(res.idCard)){
					console.log(1)
					uni.showToast({
						icon:"error",
						title: '身份证号错误'
					})
				}else{
					let that = this
					if (that.updateId == undefined || that.updateId == '') {
						const result = await this.$myRuquest({
							url: '/archives/createArchives',
							method: 'POST',
							data: {
								name: res.name,
								idCard: res.idCard,
								age: res.age,
								sex: res.sex,
								phone: res.phone,
								address: res.address,
								wxId: res.openId,
								isIll: res.isIll,
								isWill: res.isWill,
								brithDay: res.brithDay,
								email: res.email
							},
						})
						if (result.data.code == 200) {
							uni.showToast({
								title: '创建成功'
							})
						}
					} else {
						const result = await this.$myRuquest({
							url: '/archives/updateArchives',
							method: 'POST',
							data: {
								id: that.updateId,
								name: res.name,
								idCard: res.idCard,
								age: res.age,
								sex: res.sex,
								phone: res.phone,
								address: res.address,
								isIll: res.isIll,
								isWill: res.isWill,
								brithDay: res.brithDay,
								email: res.email
							},
						});
						//如果修改成功将updateId设置为空
						if (result.data.code == 200) {
							that.updateId = ''
							uni.showToast({
								title: '修改成功'
							})
						}
					}
				}
				
				


			},

			submitForm(form) {
				let that = this
				this.$refs[form]
					.submit()
					.then(res => {
						uni.showToast({
							title: '验证成功'
						})
						this.archives(that.formData)
						//两秒后跳回预约页面
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/booking/booking',
							})
						}, 2000)
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},

			//重置表单 。原生的组件input组件不能重置表单
			resetForm() {
				this.clear()
				this.$refs.form.resetFields()
			},
			//修改前数据回显
			async getArchives(){
				let that = this
				if(that.updateId!='' && that.updateId!=undefined && that.updateId!= null){
					const result = await this.$myRuquest({
						url: '/archives/getArchives',
						method:'POST',
						data:{
							id:that.updateId,
						},
					})
					that.formData = result.data.data[0]
					that.formData.phone = parseInt(that.formData.phone)
				}
			},
			clear(){
				this.formData.idCard = ''
				this.formData.phone  =''
				this.formData.email  =''
				this.formData.name  =''
				this.formData.address  =''
				this.formData.age  =''
				this.formData.sex  =''
				this.formData.brithDay  =''
				this.formData.isWill  =true
				this.formData.isIll  =false
			}		
		}
	}
</script>
<style>
	.uni-input-border {
		padding: 0 10px;
		height: 35px;
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.footer {
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

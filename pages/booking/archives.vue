<template>
	<view>
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group title="基本信息" top="0">
				<uni-forms-item name="name" required label="姓名">
					<input type="text" v-model="formData.name" class="uni-input-border" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item name="idCard" label="身份证号" >
					<input type="text" v-model="formData.idCard" @onchange="goAgeSex" class="uni-input-border" placeholder="请输入身份证号" />
				</uni-forms-item>
				<!-- 使用原生input，需要绑定binddata -->
				<uni-forms-item name="age"  label="年龄">
					{{formData.age}}
				</uni-forms-item>
				<uni-forms-item  name="sex" label="性别">
					{{formData.sex}}
				</uni-forms-item>
				<uni-forms-item name="phone" label="手机号">
					<input type="text" v-model="formData.phone" class="uni-input-border" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="address" label="详细地址">
					<input type="text" v-model="formData.address" class="uni-input-border" placeholder="请输入详细地址" />
				</uni-forms-item>
			</uni-group>
			<view>
				<button  @click="submitForm('form')">校验表单</button>
				<button  @click="resetForm">重置表单</button>
			</view>
		</uni-forms>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				formData: {
					name: '',
					age: '',
					email: '',
					sex: '',
					idCard: ''
				},
	
				show: false,
				rules: {
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名'
							},
							{
								minLength: 3,
								maxLength: 15,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
							}
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
				
				}
			}
		},
		methods: {
			//
			goAgeSex(){
			
				//获取输入身份证号码
				var UUserCard = this.formData.idCard;
				//获取出生日期
				UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
				//获取性别
				if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
				alert("男");
				//是男则执行代码 ...
				} else {
				alert("女");
				//是女则执行代码 ...
				}
				//获取年龄
				var myDate = new Date();
				var month = myDate.getMonth() + 1;
				var day = myDate.getDate();
				var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
				if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
				age++;
				}
				alert(age);
				//年龄 age
			},
			change(name, value) {
				this.formData.checked = value
				this.$refs.form.setValue(name, value)
			},
 
			submitForm(form) {
				this.$refs[form]
					.submit()
					.then(res => {
						console.log('表单的值：', res)
						uni.showToast({
							title: '验证成功'
						})
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
 
			//重置表单 。原生的组件input组件不能重置表单
			resetForm() {
				this.$refs.form.resetFields()
			},
			validateField(form) {
				this.$refs[form]
					.validateField(['name', 'email'])
					.then(res => {
						uni.showToast({
							title: '验证成功'
						})
						console.log('表单的值：', res)
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
 
			clearValidate(form, name) {
				if (!name) name = []
				this.$refs[form].clearValidate(name)
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
</style>
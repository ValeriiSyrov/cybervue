<template>
    <div class="notifications-container">
		<el-header>
			<div class="notifications-header">
				<h3>Notifications</h3>
			</div>
		</el-header>

		<el-main>
			<el-form ref="notifyData" :model="notifyData" :rules="notifyRules" label-width="150px" label-position="top">
				<el-form-item label="Title" prop="title">
					<el-input v-model="notifyData.title"
							  placeholder="Enter notify title"/>
				</el-form-item>

				<el-form-item label="Message" prop="message">
					<el-input type="textarea"
							  :autosize="{ minRows: 5, maxRows: 15}"
							  v-model="notifyData.message"
							  placeholder="Enter notify message" />
				</el-form-item>

				<el-form-item>
					<el-button type="primary"
							@click.native.prevent="handlerNotify"
							v-text="'Send'" />
				</el-form-item>
			</el-form>
		</el-main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Notifications',
	data() {
		const validateNotifyTitle = (rule, value, callback) => {
			if (!(value.trim().length > 0)) {
				callback(new Error('Please enter the correct title'))
			} else {
				callback()
			}
		}

		return {
			notifyData: {
				title: '',
				message: ''
			},
			notifyRules: {
				title: [{ required: true, trigger: 'blur', validator: validateNotifyTitle }]
			}
		}
	},
	methods: {
		handlerNotify() {
			this.$refs.notifyData.validate(valid => {
				if (valid) {
					this.$store.dispatch('notifications/sendNotification', this.notifyData).then(() => {
						this.$refs.notifyData.resetFields()
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.notifications {
	&-container {
		margin: 30px;
	}
}
</style>

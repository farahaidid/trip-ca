<template>
	<div class="card p-4 to-center">
		<h3 class="mb-2">Reset your password</h3>
		<hr />
		<div class="form" style="width:32rem">
			<div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
				{{error}}
				<button @click="onClickClose" type="button" class="close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div v-if="success" class="alert alert-info alert-dismissible fade show" role="alert">
				{{success}}
				<button @click="onClickClose" type="button" class="close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="form-group">
				<label for="email">Email address</label>
				<input class="form-control" type="email" v-model="email" placeholder="name@mailbox.com" />
			</div>
			<div class="form-group">
				<label>New Password</label>
				<input class="form-control" type="password" v-model="newPass" placeholder="New password" />
			</div>
			<div class="form-group">
				<label>Confirm</label>
				<input
					class="form-control"
					type="password"
					v-model="confirmNewPass"
					placeholder="Confirm Password"
				/>
			</div>
			<button @click="onResetPassword" class="btn btn-sm btn-primary mr-4">Reset password</button>
			<router-link to="/register" class="mr-4">Create account</router-link>
			<router-link to="/login">Login here</router-link>
		</div>
	</div>
</template>

<script>
import GLOBAL_MIXINS from "../mixins/global.mixins"
export default {
	name: "ForgotPassword",
	data: () => ({
		email: "",
		newPass: "",
		confirmNewPass: "",
		error: null,
		success: null
	}),
	mixins: [GLOBAL_MIXINS],
	methods: {
		async onResetPassword() {
			if (this.email.trim() === "") {
				this.error = "Enter your email address"
			}
			else if (this.newPass.trim() === "") {
				this.error = "Enter a new password"
			}
			else if (this.newPass !== this.confirmNewPass) {
				this.error = "Password doesn't matched!"
			}
			else {
				this.error = null
				let { error, message } = await this.RESET_PASSWORD({ email: this.email, password: this.newPass })
				if (error) this.error = error
				else {
					this.success = "Password successfully updated"
				}
				this.email = ""
				this.newPass = ""
				this.confirmNewPass = ""
			}
		},
		onClickClose() {
			this.error = this.success = null
		}
	},
}
</script>

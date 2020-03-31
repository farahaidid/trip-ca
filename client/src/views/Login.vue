<template>
	<div class="card to-center p-4">
		<h3 class="mb-4">Login to your account</h3>
      
		<div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
			{{error}}
			<button @click="onClickClose" type="button" class="close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>

		<div class="form" style="width:32rem">
			<div class="form-group">
				<label for="email">Email address</label>
				<input
					id="email"
					v-model="email"
					type="email"
					class="form-control"
					placeholder="Enter your email address"
				/>
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					id="password"
					v-model="password"
					type="password"
					class="form-control"
					placeholder="Enter your password"
				/>
			</div>
			<button class="btn btn-primary mr-4" @click="login">LOGIN</button>
			<router-link to="/register" class="mr-4">Create account</router-link>
			<router-link to="/forgot-password">Forgot password?</router-link>
		</div>
	</div>
</template>

<script>
import GLOBAL_MIXINS from "../mixins/global.mixins"
import { mapActions } from "vuex"
export default {
	name: "Login",
	data: () => ({
		email: "",
		password: "",
		error: null
	}),
	mixins: [GLOBAL_MIXINS],
	created() {
		this.LOGGED_IN && this.$router.replace(`/user/profile`)
	},
	methods: {
		async login() {
			if (this.email.trim() !== "" && this.password.trim() !== "") {
				let { error, user } = await this.LOGIN({ email: this.email, password: this.password })
				if (error) this.error = error
				else { this.reset(); this.$router.replace(`/user/profile`) }
			}
		},
		reset() {
			this.email = this.password = "";
			this.error = null
		},
		onClickClose() {
			this.error = null
		}
	},
}
</script>
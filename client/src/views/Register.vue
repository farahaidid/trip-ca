<template>
	<div class="card p-4">
		<h4>Create Your Profile!</h4>
		<hr />
		<div class="form w-100 px-5">
			<div v-if="errorMsg" class="alert alert-danger alert-dismissible fade show" role="alert">
				{{errorMsg}}
				<button @click="onClickClose" type="button" class="close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div v-if="sucMsg" class="alert alert-info alert-dismissible fade show" role="alert">
				{{sucMsg}}
				<button @click="onClickClose" type="button" class="close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">First Name</label>
				<input
					class="form-control form-control-sm"
					type="text"
					v-model="firstName"
					placeholder="First name"
				/>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">Last Name</label>
				<input
					class="form-control form-control-sm"
					type="text"
					v-model="lastName"
					placeholder="Last name"
				/>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">Email address</label>
				<input
					class="form-control form-control-sm"
					type="email"
					v-model="email"
					placeholder="name@mailbox.com"
				/>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">Password</label>
				<input
					class="form-control form-control-sm"
					type="password"
					v-model="password"
					placeholder="Password"
				/>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">Phone</label>
				<input
					class="form-control form-control-sm"
					type="tel"
					v-model="phone"
					placeholder="Your phone number"
				/>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">Gender</label>
				<div class="d-flex mt-1 w-100">
					<div class="mr-4">
						<input v-model="gender" type="radio" value="male" />
						<label class="ml-2" for="male">Male</label>
					</div>
					<div>
						<input v-model="gender" type="radio" value="gender" />
						<label class="ml-2" for="female">Female</label>
					</div>
				</div>
			</div>
			<div class="d-flex mb-2">
				<label class="w-25">Birthdate</label>
				<input class="form-control form-control-sm" type="date" v-model="dateOfBirth" />
			</div>
		</div>
		<hr />
		<div>
			<button class="btn btn-sm btn-primary mr-2" @click="onSubmit">Submit</button>
			<button class="btn btn-sm btn-danger mr-3" @click="reset(true)">Reset</button>
			<router-link to="/login">Already have an account?</router-link>
		</div>
	</div>
</template>

<script>
import { API } from "../axios/config.axios"
export default {
	name: "CreateAccount",
	data: () => ({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phone: "",
		dateOfBirth: "",
		gender: "male",
		errorMsg: null,
		sucMsg: null
	}),
	methods: {
		reset(all) {
			this.strFields.forEach(key => this[key] = "")
			this.dateOfBirth = Date.now()
			this.gender = "male"
			if (all) this.errorMsg = this.sucMsg = null
		},
		async onSubmit() {
			let valid = this.validate()
			if (!valid) { this.errorMsg = "Please fill the form correctly!"; return }
			this.errorMsg = null
			try {
				let data = (await API.post("users", {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					password: this.password,
					dateOfBirth: this.dateOfBirth,
					gender: this.gender,
					phone: this.phone
				})).data

				if (data.code == 409) {
					this.errorMsg = "User already exist. Please login!"
					this.sucMsg = null
				}
				else {
					this.sucMsg = data.message
					this.errorMsg = null
				}
				this.reset()
			}
			catch (error) {
				console.log(error.response)
				this.errorMsg = error.response.message
			}
		},
		validate() {
			return this.strFields.every(f => this[f].trim() !== "")
		},
		onClickClose() {
			this.errorMsg = this.sucMsg = null
		}
	},
	computed: {
		strFields: () => ["firstName", "lastName", "email", "password", "phone", "dateOfBirth"]
	},
}
</script>
<style lang="scss" scoped>
	.card {
		width: 44rem;
		margin: 8rem auto 4rem auto;
	}
</style>
<template>
	<div>
		<div class="c-card">
			<div class="d-flex">
				<div class="w-100">
					<h3>
						<span v-if="update">Update</span>
						<span v-else>Profile</span> informations
					</h3>
				</div>
				<div class="spacer" />
				<div class="d-flex">
					<button class="btn btn-sm btn-info" v-if="!update" @click="update=true">Update</button>
					<button class="btn btn-sm btn-danger mr-2" v-if="update" @click="update=false">Cancel</button>
					<button class="btn btn-sm btn-primary" @click="updateInfo" v-if="update">Save</button>
				</div>
			</div>
			<div class="name item">
				<label>NAME</label>
				<div v-if="update">
					<input v-model="updateData.firstName" type="text" class="mr-4" placeholder="Firstname" />
					<input v-model="updateData.lastName" type="text" placeholder="Lastname" />
				</div>
				<p v-else>{{fullName}}</p>
			</div>
			<div class="email item">
				<label>EMAIL</label>
				<input v-if="update" v-model="updateData.email" type="text" placeholder="Email address" />
				<p v-else>{{LOGGED_USER.email}}</p>
			</div>
			<div class="dob item">
				<label>DATE OF BIRTH</label>
				<input v-if="update" v-model="updateData.dateOfBirth" type="date" />
				<p v-else>{{dob}}</p>
			</div>
			<div class="gender item">
				<label>GENDER</label>
				<div v-if="update" class="radios d-flex mt-1">
					<div class="mr-4">
						<input v-model="updateData.gender" type="radio" value="male" />
						<label class="lh-n">Male</label>
					</div>
					<div>
						<input v-model="updateData.gender" type="radio" value="female" />
						<label class="lh-n">Female</label>
					</div>
				</div>
				<p v-else>{{LOGGED_USER.gender}}</p>
			</div>
			<div class="phone item">
				<label>PHONE</label>
				<input v-if="update" v-model="updateData.phone" type="text" placeholder="Phone number" />
				<p v-else>{{LOGGED_USER.phone}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import GLOBAL_MIXINS from "../mixins/global.mixins"
import moment from "moment"
export default {
	name: "Profile",
	data: () => ({
		error: null,
		success: null,
		update: false,
		updateData: {
			firstName: "", lastName: "",
			email: "", gender: "",
			dateOfBirth: "", phone: ""
		}
	}),
	mixins: [GLOBAL_MIXINS],
	computed: {
		fullName() {
			let { firstName, lastName } = this.LOGGED_USER
			return `${firstName} ${lastName}`
		},
		dob() {
			return moment(this.LOGGED_USER.dateOfBirth).format("LL")
		}
	},
	watch: {
		LOGGED_USER(user) { this.setUpdateData() },
		update(val) {
			val === true && this.setUpdateData()
		}
	},
	methods: {
		setUpdateData() {
			let dob = new Date(this.LOGGED_USER.dateOfBirth).toISOString().substr(0, 10)
			this.updateData = { ...this.LOGGED_USER, dateOfBirth: dob }
		},
		updateInfo() {
			let valid = this.validate()
			if (!valid) {
				this.error = "Please fill the informations correctly"
				this.success = null
			}
			else {
				this.error = null;
				this.UPDATE_USER_PROFILE(this.updateData).then(({ error, message }) => {
					if (error) { this.error = error }
					else { this.success = "Profile updated successfully"; this.update = false }
				})
			}
		},
		validate() {
			let fields = this.strFields.filter(a => a !== "password")
			return fields.every(f => this.updateData[f].trim() !== "")
		}
	}
}
</script>
<style lang='scss' scoped>
	.c-card {
		margin: 1rem auto;
		padding: 1rem 2rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		width: 44rem;
		h3 {
			margin-bottom: 1rem;
		}
		.item {
			padding-bottom: 1rem;
			margin-bottom: 0.5rem;
			border-bottom: 1px solid #dadce0;
			&:last-child {
				border: none;
			}
			label {
				color: grey;
				font-size: 0.9em;
				display: block;
			}
			.radios {
				label {
					display: unset;
				}
			}
			p {
				font-size: 1em;
				margin-bottom: 0;
			}
			label {
				margin-bottom: 0;
			}
		}
	}
</style>
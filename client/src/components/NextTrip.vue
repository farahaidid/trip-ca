<template>
	<div class="next-trip container">
		<div class="card" style="margin:4rem 2rem">
			<div class="card-body">
				<h5 class="card-title">Plan your next trip to Iran!</h5>
				<h6 class="card-subtitle mb-2 text-muted">Fill up the form to save your travel plan</h6>
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
						<label for="cities">City you plan on traveling to</label>
						<select v-model="city" class="form-control" id="cities">
							<option
								v-for="(city, i) in cities"
								:key="i"
								:value="city"
							>{{i==0?'-Please Select a City-':city}}</option>
						</select>
					</div>
					<div>
						<label>Travel Date</label>
						<div class="d-flex">
							<div class="form-group w-100">
								<input v-model="dateFrom" type="date" class="form-control" placeholder="First name" />
							</div>
							<span style="margin:0.4rem 1rem">to</span>
							<div class="form-group w-100">
								<input v-model="dateTo" type="date" class="form-control" placeholder="Last name" />
							</div>
						</div>
					</div>
					<button @click="onClickSubmit" type="button" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment"
import GLOBAL_MIXINS from "../mixins/global.mixins"
export default {
	name: "AddTrip",
	data: () => ({
		city: null,
		cities: [null, "Tehran", "Shiraz", "Isfahan", "Yazd"],
		dateFrom: "", dateTo: "",
		error: null, success: null
	}),
	mixins: [GLOBAL_MIXINS],
	created() {
		this.dateFrom = new Date().toISOString().substr(0, 10)
		const DAYS_LATER = day => moment().add(day, 'days').format("X") * 1000
		this.dateTo = new Date(DAYS_LATER(3)).toISOString().substr(0, 10)
	},
	methods: {
		async onClickSubmit() {
			if (!this.city) { return this.error = "Please select a city first!" }
			let { error, message } = await this.SAVE_TRIP({ city: this.city, dateFrom: this.dateFrom, dateTo: this.dateTo })
			console.log(error, message)
			if (error) { return this.error = error }
			this.success = message
		},
		onClickClose() { this.error = this.success = null }
	},
}
</script>

<style>
</style>
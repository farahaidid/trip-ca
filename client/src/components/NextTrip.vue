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
						<label for="cities" class="mb-0">City you plan on traveling to</label>
						<div class="my-2">
							<img :src="cityImage.image" alt="" v-for="(cityImage,cI) in computedCityImages" :key="cI" class="d-inline-block mr-2 city-image">
						</div>
						<select v-model="city" class="form-control" id="cities">
							<option
								v-for="(city, i) in cities"
								:key="i"
								:value="city"
							>{{i==0?'-Please Select a City-':city}}</option>
						</select>
					</div>
					<div>
						<label for="">Cost (Including Hotel and Tour Guide <strong>${{costPerWeek}}/week</strong> )</label>
						<p class="m-0 p-0 mb-2">
							<strong class="ml-1">${{cost}}</strong> <span>(For {{daysDiff}} Days)</span>
						</p>
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
		costPerWeek: 2500,
		city: null,
		cities: [null, "Tehran", "Shiraz", "Isfahan", "Yazd"],
		dateFrom: "", dateTo: "",
		error: null, success: null,
		cityImages:[
			{city: "Isfahan", image: require("@/assets/images/isfahan.jpg")},
			{city: "Isfahan", image: require("@/assets/images/sio.jpg")},
			{city: "Shiraz", image: require("@/assets/images/cyrus.jpg")},
			{city: "Shiraz", image: require("@/assets/images/gate.jpg")},
			{city: "Yazd", image: require("@/assets/images/fire_temple.jpg")},
			{city: "Yazd", image: require("@/assets/images/yazd.jpg")},
			{city: "Tehran", image: require("@/assets/images/azadi.jpg")},
			{city: "Tehran", image: require("@/assets/images/milad.jpg")},
		]
	}),
	mixins: [GLOBAL_MIXINS],
	created() {
		this.dateFrom = new Date().toISOString().substr(0, 10)
		const DAYS_LATER = day => moment().add(day, 'days').format("X") * 1000
		this.dateTo = new Date(DAYS_LATER(3)).toISOString().substr(0, 10)
	},
	computed:{
		computedCityImages(){
			if(this.city == null || this.city.trim().length == 0) return []
			return this.cityImages.filter(cityImage => this.city == cityImage.city)
		},
		daysDiff(){
			return moment(this.dateTo).diff(moment(this.dateFrom),"days") + 1
		},
		cost(){
			let perDayCost = this.costPerWeek / 7
			return (this.daysDiff * perDayCost).toFixed(2)
		}
	},
	methods: {
		async onClickSubmit() {
			if (!this.city) { return this.error = "Please select a city first!" }
			let { error, message } = await this.SAVE_TRIP({ city: this.city, dateFrom: this.dateFrom, dateTo: this.dateTo, price: this.cost })
			console.log(error, message)
			if (error) { return this.error = error }
			this.success = message
		},
		onClickClose() { this.error = this.success = null }
	},
}
</script>

<style scoped>
.city-image{
	height: 100px;
	width: 150px;
}
</style>
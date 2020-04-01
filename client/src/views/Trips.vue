<template>
	<div class="card p-3 mx-auto" style="width:44rem">
		<h3 v-if="TRIPS.length>0">Your upcoming trips</h3>
		<h3 v-else>Your have no active trips</h3>
		<table v-if="TRIPS.length>0" class="table">
			<thead class="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">City</th>
					<th scope="col">Date from</th>
					<th scope="col">Date to</th>
					<th scope="col">Price</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(trip,index) in TRIPS" :key="trip._id">
					<th scope="row">{{index+1}}</th>
					<td>{{trip.city}}</td>
					<td>{{formated(trip.dateFrom)}}</td>
					<td>{{formated(trip.dateTo)}}</td>
					<td>${{trip.price}}</td>
					<td>
						<button @click="DELETE_TRIP(trip._id)" class="btn btn-sm btn-danger ml-1">&times;</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import GLOBAL_MIXINS from "../mixins/global.mixins"
import moment from "moment"
export default {
	name: "Trips",
	created() { this.FETCH_TRIPS() },
	mixins: [GLOBAL_MIXINS],
	methods: {
		formated(date) {
			return moment(date).format("LL")
		}
	},
}
</script>
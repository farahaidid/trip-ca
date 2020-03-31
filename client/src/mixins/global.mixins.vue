<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	name: "GlobalMixins",
	computed: {
		...mapGetters("AUTH", ["LOGGED_IN", "LOGGED_USER"]),
		...mapGetters("TRIP", ["TRIPS"]),
		strFields: () => ["firstName", "lastName", "email", "password", "phone", "dateOfBirth"]
	},
	methods: {
		...mapMutations("AUTH", ["SET_AUTH_STATE"]),
		...mapActions("AUTH", ["LOGIN", "FETCH_USER_PROFILE", "UPDATE_USER_PROFILE", "RESET_PASSWORD"]),
		...mapActions("TRIP", ["SAVE_TRIP", "FETCH_TRIPS", "DELETE_TRIP"]),
	},
}
</script>
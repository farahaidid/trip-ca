<template>
	<div class="p-10">
		<div class="h-6rem" />
		<h1 class="ta-c">User</h1>
		<router-view />
	</div>
</template>

<script>
import GLOBAL_MIXINS from "../mixins/global.mixins"
import { mapGetters, mapActions } from 'vuex'
export default {
	name: "User",
	mixins: [GLOBAL_MIXINS],
	created() {
		if (this.LOGGED_IN) { this.FETCH_USER_PROFILE() }
		else { this.$router.replace("/login") }
	},
}
</script>

<style scoped>
	h1 {
		position: unset !important;
	}
</style>
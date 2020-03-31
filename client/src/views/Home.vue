<template>
	<div class="home">
		<Section1 />
		<section class="content">
			<NextTrip v-if="LOGGED_IN" id="next-trip" />
		</section>
		<Other />
	</div>
</template>

<script>
import Section1 from "@/components/Section1"
import NextTrip from "@/components/NextTrip"
import Other from "@/components/Other"

import GLOBAL_MIXINS from "../mixins/global.mixins"

export default {
	name: 'Home',
	components: {
		Section1, NextTrip, Other
	},
	mixins: [GLOBAL_MIXINS]
}
</script>

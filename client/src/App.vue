<template>
	<div id="app">
		<Header />
		<router-view />
	</div>
</template>
<script>
import Header from "./components/Header"
export default {
	name: "App",
	components: { Header }
}
</script>
<style>
	@import url("./assets/css/style.css");
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

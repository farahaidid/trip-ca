<template>
	<nav>
		<div class="logo">
			<img src="@/assets/images/iran.png" style="width:100px; height:90px;" />
			<h1>Travel Iran</h1>
		</div>
		<ul>
			<li v-for="(item, index) in items" :key="index" @click="onClickRouterLink(item,index)">
				<router-link :to="item.to" :class="item.active&&'active'">{{item.text}}</router-link>
			</li>
		</ul>
		<div v-if="LOGGED_IN" id="account">
			<img src="../assets/images/google-contacts.png" alt="Account thumbnail" />
			<input type="text" />
			<div class="dropdown list-group">
				<a href="#" class="list-group-item list-group-item-action">
					<h5 class="mb-0">{{LOGGED_USER.firstName+" "+LOGGED_USER.lastName}}</h5>
					<p class="mb-0">{{LOGGED_USER.email}}</p>
				</a>
				<router-link to="/user/profile" class="list-group-item list-group-item-action">Profile</router-link>
				<router-link to="/user/trips" class="list-group-item list-group-item-action">Trips</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import GLOBAL_MIXINS from "../mixins/global.mixins"
export default {
	name: "Header",
	data: () => ({
		items: [
			{ text: "Home", to: "/", active: true },
			{ text: "About Iran", to: "#", active: false },
			{ text: "FAQ", to: "/faq", active: false },
		]
	}),
	created() { this.fixNavs() },
	mixins: [GLOBAL_MIXINS],
	methods: {
		fixNavs() {
			//let lastIndex = this.items.length - 1
			if (this.LOGGED_IN) {
				this.items.push({ text: "Logout", to: "/", active: false })
			} else {
				this.items.push({ text: "Login", to: "/login", active: false })
			}
		},
		onClickRouterLink(item, i) {
			if (item.text === "Logout") { this.SET_AUTH_STATE({ loggedIn: false, loggedUser: {} }) }
			this.items = this.items.map((el, ind) => i === ind ? ({ ...el, active: true }) : ({ ...el, active: false }))
		}
	},
	watch: {
		LOGGED_IN() { this.fixNavs() }
	},
}
</script>
<style lang='scss' scoped>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 110px;
		padding: 10px 100px;
		box-sizing: border-box;
		transition: 0.5s;
		color: black;
		background-color: white;
		z-index: 100;
	}
	.logo img {
		float: left;
		width: 100px;
		height: 100px;
	}
	.logo h1 {
		float: left;
		position: relative;
		top: 35px;
		left: 10px;
	}
	nav ul {
		float: right;
		margin: 0;
		padding: 0;
		display: flex;
	}
	nav ul li {
		list-style: none;
	}
	nav ul li a {
		line-height: 80px;
		color: #262626;
		padding: 5px 20px;
		text-decoration: none;
		text-transform: uppercase;
		transition: 0.5s;
	}
	nav ul li a.active,
	nav ul li a:hover {
		color: #fff;
		background: #f00;
	}
	#account {
		position: fixed;
		right: 1.5rem;
		top: 2rem;
		input {
			width: 2rem;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			cursor: pointer;
		}
		img {
			height: 2rem;
			cursor: pointer;
			pointer-events: none;
		}
		.dropdown {
			opacity: 0;
			position: absolute;
			z-index: 10;
			left: -150px;
			visibility: hidden;
		}
	}
	#account:focus-within {
		h1 {
			color: red;
		}
		.dropdown {
			opacity: 1;
			visibility: visible;
		}
	}
</style>
<template>
    <div class="users-container">
		<div class="users-text">name: {{ name }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Users',
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>

<style lang="scss" scoped>
.users {
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>

<template>
    <div class="articles-container">
		<div class="articles-text">name: {{ name }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Articles',
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>

<style lang="scss" scoped>
.articles {
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>

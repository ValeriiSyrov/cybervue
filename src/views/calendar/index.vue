<template>
    <div class="calendar-container">
		<div class="calendar-text">name: {{ name }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Calendar',
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>

<style lang="scss" scoped>
.calendar {
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}
</style>

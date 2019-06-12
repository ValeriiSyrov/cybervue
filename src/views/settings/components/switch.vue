<template>
    <el-switch v-model="value"></el-switch>
</template>

<script>
export default {
    props: {
        category: [Array, Object],
        allowed: [Array, Object]
    },
    computed: {
        value: {
            get() {
                let switched = false
                this.allowed.forEach(element => {
                    if (element == this.category._id) switched = true
                });
                return switched
            },
            set(value) {
                this.$emit('switch', [value, this.category])
            }
        }
    }
}
</script>

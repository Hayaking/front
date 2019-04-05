<template>
    <div>
        <h1>{{user}}</h1>
    </div>
</template>

<script>
    export default {
        name: "search",
        data:function () {
            return{
                user : null
            }
        }, mounted(){
            this.user = this.$route.query.user
        },
    }
</script>

<style scoped>

</style>
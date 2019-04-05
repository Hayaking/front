<template>
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem v-for="item in items" v-bind:key="item">{{item}}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
    /* eslint-disable vue/require-valid-default-prop */

    export default {
        name: "BreadcrumbGroup",
        props: {
            items: {
                type:Array,
                default:[]
            }
        }

    }
</script>

<style scoped>

</style>
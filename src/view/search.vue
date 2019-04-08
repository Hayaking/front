<template>
    <div>
        <BreadGroup :style="{margin: '16px 0'}" :items=bread></BreadGroup>
        <Card :padding=0 >
            <!--<div>{{json}}</div>-->
            <ContactItem :item=user></ContactItem>
        </Card>
    </div>
</template>

<script>
    import BreadGroup from '../components/breadcrumbGroup';
    import ContactItem from '../components/adapter/item-contact';
    export default {
        components: {BreadGroup,ContactItem},
        name: "search",
        data() {
            return{
                user :null,
                bread: ["功能","搜索"]
            }
        },
        mounted() {
            this.user = this.$route.query.user;
        },
    }
</script>

<style scoped>

</style>
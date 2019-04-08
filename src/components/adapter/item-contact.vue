<template>
    <div>
        <Card :padding=5 :bordered=false class="contact-item" >
            <Avatar v-if="item.hasOwnProperty('_id')" shape="square" icon="ios-chatbubbles" />
            <Avatar v-else shape="square" icon="ios-person" />
            <div>{{item.name}}</div>
            <div v-if="currentName===item.name" style="float: right;margin-top: 5px;">⚓</div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "contact-item",

        props: {
            item:{
                type:Object,
            },
            currentName:{
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped>
    .contact-item {
        margin-bottom: 5px;
    }
    .contact-item div {
        display: inline;
        margin-left: 10px;
    }
</style>
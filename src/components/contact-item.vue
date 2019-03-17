<template>
    <div>
        <Card :padding=5 :bordered=false class="contact-item" >
            <Avatar v-if="item.hasOwnProperty('_id')" shape="square" icon="ios-chatbubbles" />
            <Avatar v-else shape="square" icon="ios-person" />
            <div style="display: inline;margin-left: 10px">{{item.name}}</div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "contact-item",
        props: {
            item:{
                type:Object,
            }
        },
    }
</script>

<style scoped>
    .contact-item {
        margin-bottom: 5px;
    }
</style>
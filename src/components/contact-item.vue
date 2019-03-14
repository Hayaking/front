<template>
    <div>
        <Card :padding=5 :bordered=false class="contact-item">
            <Avatar shape="square" icon="ios-person" />
            <div style="display: inline;margin-left: 10px">{{name}}</div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "contact-item",
        props: {
            name: {
                type: String,
                default: "无名"
            },
        },
    }
</script>

<style scoped>
    .contact-item {
        margin-bottom: 5px;
    }
</style>
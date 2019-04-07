<template>
    <div>
        <div v-for="item in items" v-bind:key="item.hash">
            <MessageItem :body=item.text :type=item.type :from=item.account />
        </div>
    </div>
</template>

<script>
    /* eslint-disable vue/require-valid-default-prop */
    import MessageItem from './adapter/item-message';
    export default {
        name: "infoList",
        components:{MessageItem},
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
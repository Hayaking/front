<template>
    <div v-if="type==='RECEIVED'" >
        <Button type="success" class="RECEIVED">{{body}}</Button>

    </div>
    <div v-else >
        <Button type="info" class="SEND">{{body}}</Button>

    </div>
</template>

<script>
    export default {
        name: "message-item",
        props:{
            type:{
                type: String,
                default: 'RECEIVED'
            },
            body:{
                type:String,
                default: 'wtf'
            }
        }
    }
</script>

<style scoped>
    .RECEIVED {
        float: left;
        clear:both
    }
    .SEND {
        float: right;
        clear:both

    }
</style>
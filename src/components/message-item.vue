<template>
    <div v-if="type==='RECEIVED'" class="RECEIVED">
        <div style="display: inline;margin-right: 5px">{{from}}</div>
        <Button type="success" >{{body}}</Button>

    </div>
    <div v-else class="SEND">
        <Button type="info" style="display: inline">{{body}}</Button>
        <div style="display: inline;margin-left: 5px">{{from}}</div>

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
            },
            from:{
                type:String,
                default: 'wtf'
            }
        }
    }
</script>

<style scoped>
    .RECEIVED {
        float: left;
    }
    .SEND {
        float: right;
    }
    .SEND,.RECEIVED {
        clear:both;
        margin-bottom: 5px;
    }
</style>
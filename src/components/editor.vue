<template>
    <div>
        <Split v-model="split" >
            <!--<div slot="left" v-model="edit" contenteditable="true" style="min-height: 100px"></div>-->
            <Input  slot="left" v-model="edit"  type="textarea" :rows="4"  placeholder="Enter something..."/>
            <div slot="right">
                <Button type="primary" style="float: right" @click="send">发送</Button>
            </div>
        </Split>
    </div>
</template>

<script>
    export default {
        name: "editor",
        data () {
            return {
                split:0.92,
                edit:null,
            }
        },
        methods: {
            send: function () {
                this.$emit('sendText', this.edit);
            }
        }
    }
</script>

<style scoped>

</style>
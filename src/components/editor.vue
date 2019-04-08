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
                split:0.93,
                edit:null,
            }
        },
        methods: {
            send: function () {
                if (this.edit.trim() === '') {
                    this.$Message.error('发送消息不得为空或空格');
                } else {
                    this.$emit('sendText', this.edit);

                }
                this.clear();
            },
            clear: function () {
                this.edit = '';
            }
        }
    }
</script>

<style scoped>

</style>
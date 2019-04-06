<template>
    <div>
        <Split v-model="split3" >
            <Input  slot="left" v-model="edit"  type="textarea" :rows="4"  placeholder="Enter something..."/>
            <div slot="right">
                <Button type="primary" style="float: right" @click="send()">Primary</Button>
            </div>
        </Split>
    </div>
</template>

<script>
    export default {
        name: "editer",
        data () {
            return {
                split3:0.92,
                contactList: null,
                edit:null,
                account: null,
            }
        },
        methods: {
            send: function () {
                this.$emit('send', this.edit);
            }
        }
    }
</script>

<style scoped>

</style>
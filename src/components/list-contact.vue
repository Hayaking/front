<template>
    <div>
        <div v-for="item in items" v-bind:key="item.name" @click="switchContact(item)" >
            <ContactItem :item=item  :currentName="currentName"/>
        </div>
    </div>
</template>

<script>
    /* eslint-disable vue/require-valid-default-prop */
    import ContactItem from './adapter/item-contact';
    export default {
        name: "list-contact",
        components:{ContactItem},
        data() {
            return{
                currentName:null
            }
        },
        props: {
            items: {
                type:Array,
                default:[]
            }
        },
        methods: {
            switchContact:function (item) {
                let obj;
                if (item.hasOwnProperty('_id')) {
                    obj = {
                        type: 'group',
                        id: item.id,
                        name: item.name
                    }
                } else {
                    obj = {
                        type: 'contact',
                        id: item.id,
                        name: item.name
                    }
                }
                this.currentName = item.name;
                this.$emit('switchContact', obj);
            }
        }
    }
</script>

<style scoped>

</style>
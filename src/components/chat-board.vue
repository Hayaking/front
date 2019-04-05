<template>
    <div>
        <BreadGroup :style="{margin: '16px 0'}" :items=bread></BreadGroup>
        <Card :padding=0 >
            <div id="chatBoard" class="board" >
                <Split v-model="split1" max="100px" min="200px" >
                    <div slot="left" class="board-list" >
                        <div v-for="item in contactList" v-bind:key="item.name" @click="switchContact(item)">
                            <ContactItem :item=item />
                        </div>
                    </div>
                    <div slot="right" class="board-right">
                        <div class="title">{{currentContact}}</div>
                        <Split v-model="split2" mode="vertical" max="150px">

                            <div slot="top" class="board-info" >
                                <div v-for="item in infolist" v-bind:key="item.account">
                                    <MessageItem :body=item.text :type=item.type :from=item.account />
                                </div>
                            </div>
                            <div slot="bottom" class="board-edit">
                                <Split v-model="split3" >
                                    <Input  slot="left" v-model="edit"  type="textarea" :rows="4"  placeholder="Enter something..."/>
                                    <div slot="right">
                                        <Button type="primary" style="float: right" @click="send()">Primary</Button>
                                    </div>
                                </Split>
                            </div>
                        </Split>
                    </div>
                </Split>
            </div>
        </Card>
    </div>

</template>

<script>
    import ContactItem from './contact-item';
    import MessageItem from './message-item';
    import BreadGroup from './breadcrumbGroup';
    import axios from 'axios';

    export default {
        components: {ContactItem,MessageItem,BreadGroup},

        data () {
            return {
                split1: 0.2,
                split2: 0.68,
                split3:0.92,
                contactList: null,
                edit:null,
                account: null,
                infolist:[],
                currentContact: null,
                currentContactType: null,
                currentGroupId: null,
                bread: ["haya", "haya"]
            }
        },
        mounted () {
            axios.get('http://localhost:8081/contacts', {
                    params: {
                        token: window.localStorage.getItem("token"),
                        name: window.localStorage.getItem('name')
                    }
            }).then(response => (this.contactList = response.data.contacts));
        },
        sockets: {
            receiveMessage:function (data) {
                this.infolist.push(JSON.parse(data));
            }
        },
        methods: {
            send: function () {
                let jsonObject;

                if (this.currentContactType === 'contact') {
                    jsonObject = {
                        account: window.localStorage.getItem("name"),
                        token: window.localStorage.getItem("token"),
                        to: this.currentContact,
                        text: this.edit,
                        type: 'SEND'
                    };
                    this.$socket.emit('sendMessage', jsonObject);
                } else if (this.currentContactType === 'group') {
                    jsonObject = {
                        account: window.localStorage.getItem("name"),
                        token: window.localStorage.getItem("token"),
                        to: this.currentGroupId,
                        text: this.edit,
                        type: 'SEND'
                    };
                    this.$socket.emit('groupMessage', jsonObject);
                }
                this.infolist.push(jsonObject);
            },
            switchContact:function (item) {
                if (item.hasOwnProperty('_id')) {
                    this.currentContactType = 'group';
                    this.currentGroupId = item._id;
                } else {
                    this.currentContactType = 'contact';
                }
                this.currentContact = item.name;
                this.infolist = [];
            }
        }
    }
</script>

<style scoped>
    .title {
        padding: 10px;
        text-align: center;
        background: #dcdcdc;
        height: 40px;
    }
    .board,.board-list,.board-right{
        height: 600px;
    }
    .board-list{
        padding: 10px;
        overflow-y: auto;
        /*height:-webkit-fill-available;*/
    }

    .board-info{
        overflow-y: auto;
        padding: 10px;
        height:100%;
    }
    .board-edit{
        overflow-x: hidden;
        padding: 10px;
        height: 150px;

    }
    .board-right{
        padding: 0;
    }
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(133, 133, 133, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(196, 196, 196, 0.3);
        background-color: #b9b9b9;
    }
</style>
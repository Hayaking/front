<template>
    <div>
        <BreadGroup :style="{margin: '16px 0'}" :items=bread></BreadGroup>
        <Card :padding=0 >
            <div id="chatBoard" class="board" >
                <Split v-model="split1" max="100px" min="200px" >
                    <div slot="left" class="board-list" >
                        <ContactList :items=contactList @switchContact="switchContact"/>
                    </div>
                    <div slot="right" class="board-right">
                        <div class="title">{{currentContact.name}}</div>
                        <Split v-model="split2" mode="vertical" max="150px">
                            <div slot="top" class="board-info" >
                                <MessageList :items=messageList />
                            </div>
                            <div slot="bottom" class="board-edit">
                                <MessageEditor @sendText="send"/>
                            </div>
                        </Split>
                    </div>
                </Split>
            </div>
        </Card>
    </div>

</template>

<script>
    import axios from 'axios';
    import BreadGroup from './breadcrumbGroup';
    import ContactList from './list-contact';
    import MessageEditor from './editor';
    import MessageList from './list-info';
    export default {
        components: {BreadGroup,ContactList, MessageEditor,MessageList},

        data () {
            return {
                split1: 0.2,
                split2: 0.68,
                contactList: null,
                messageList:[],
                currentContact: {}, // name,type,id
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
                this.messageList.push(JSON.parse(data));
            }
        },
        methods: {
            send: function (text) {
                let jsonObject;
                if (this.currentContact.type === 'contact') {
                    jsonObject = {
                        account: window.localStorage.getItem("name"),
                        token: window.localStorage.getItem("token"),
                        to: this.currentContact.name,
                        text: text,
                        type: 'SEND'
                    };
                    this.$socket.emit('sendMessage', jsonObject);
                } else if (this.currentContact.type === 'group') {
                    jsonObject = {
                        account: window.localStorage.getItem("name"),
                        token: window.localStorage.getItem("token"),
                        to: this.currentContact.id,
                        text: text,
                        type: 'SEND'
                    };
                    this.$socket.emit('groupMessage', jsonObject);
                }
                this.messageList.push(jsonObject);
            },
            switchContact:function (obj) {
                this.currentContact = obj;
                this.messageList = [];
            }
        }
    }
</script>

<style scoped>
    .title {
        padding: 10px;
        text-align: center;
        background: #697489;
        height: 40px;
        color: #fff;
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
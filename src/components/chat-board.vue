<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card :padding=0 >
            <div id="chatBoard" class="board" >
                <Split v-model="split1" max="100px" min="200px" style="">
                    <div slot="left" class="board-list" >
                        <div v-for="item in contactList" v-bind:key="item._id">
                            <ContactItem :name=item.name />
                        </div>
                    </div>
                    <div slot="right" class="board-right">
                        <Split v-model="split2" mode="vertical" max="150px">
                            <div slot="top" class="board-info" >
                                <div v-for="item in infolist" >
                                    <MessageItem :body=item.text :type=item.type></MessageItem>
                                </div>

                            </div>
                            <div slot="bottom" class="board-edit">
                                <Input  v-model="edit" type="textarea" :rows="4" placeholder="Enter something..."/>
                                <Button type="primary" style="float: right" @click="send()">Primary</Button>
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
    import axios from 'axios';

    export default {
        components: {ContactItem,MessageItem},

        data () {
            return {
                split1: 0.2,
                split2: 0.72,
                contactList: null,
                edit:null,
                account: null ,
                infolist:[{"token":"e2c8dbbd-2c23-4dec-a08e-082ee589a874","account":"admin","to":"admin","text":"6","type":"RECEIVED"}
                ,{"token":"e2c8dbbd-2c23-4dec-a08e-082ee589a874","account":"admin","to":"admin","text":"6","type":"SEND"}
                ]
            }
        },
        mounted () {
            axios
                .get('http://localhost:8081/users')
                .then(response => (this.contactList = response.data.users));
        },
        sockets: {
            receiveMessage:function (data) {
                // alert(data);
                this.infolist.push(JSON.parse(data));
            }
        },
        methods: {
            send: function () {
                var jsonObject = {
                    account: window.localStorage.getItem("name"),
                    token: window.localStorage.getItem("token"),
                    to: "admin",
                    text: this.edit,
                    type: 'SEND'
                };
                this.infolist.push(jsonObject);
                this.$socket.emit('sendMessage', jsonObject);
            }
        }
    }
</script>

<style scoped>
    .board,.board-list,.board-right{
        height: 600px;
    }
    .board-list{
        padding: 10px;
        overflow-y: auto;
        /*height:-webkit-fill-available;*/
    }

    .board-info,.board-edit{
        overflow-y: auto;
        padding: 10px;
        height:-webkit-fill-available;
        height:-moz-fill-available;
        /*height:fill-available;*/
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
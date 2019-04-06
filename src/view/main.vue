<template>
    <div v-if="show">
        <Sider theme="dark" v-if="isShow"/>
        <Layout class="layout">
            <Header class="header">
                <Input search placeholder="搜索用户" style="width:50%"  @on-search="searchContact"/>
                <div class="demo-avatar-badge" style="float: right">
                    <Dropdown @on-click="logoff">
                        <Badge :count="1" :offset=[45,5]>
                            <Avatar shape="square" icon="ios-person" />
                        </Badge>
                        <DropdownMenu slot="list">
                            <DropdownItem>个人信息</DropdownItem>
                            <DropdownItem name="logoff">退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Header>
            <Content class="content">
                <router-view ></router-view>
            </Content>
        </Layout>
    </div>
    <div v-else>
        <Login @login="isShow"/>
    </div>
</template>

<script>
    import Sider from '../components/sider';
    import axios from 'axios';
    import Login from './login';
    export default {
        name: 'app',
        components: {Sider,Login},
        data() {
            return{
                show: false
            };
        },
        mounted(){
            this.isShow();
        },
        methods: {
            logoff: function (name) {
                if ('logoff' === name) {

                    const jsonObject = {
                        account: window.localStorage.getItem("name"),
                        token: window.localStorage.getItem("token"),
                    };
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("name");
                    window.localStorage.removeItem("password");
                    this.$socket.emit('logoffMessage', jsonObject);
                    this.$Message.info('清除成功');
                    // this.$store.dispatch('hide_sider');
                    // alert(this.$store.getters.isShow);
                    this.isShow();
                    this.$router.push("/");
                }
            },
            searchContact:function () {
                axios.get('http://localhost:8081/search', {
                    params: {
                        token: window.localStorage.getItem("token"),
                        name: window.localStorage.getItem('name')
                    }
                }).then(response => (this.$router.push({
                    path:"/search",
                    query:{
                        user:response.data
                    }
                })));
                // axios.get('http://localhost:8081/search', {
                //     params: {
                //         token: window.localStorage.getItem("token"),
                //         name: window.localStorage.getItem('name')
                //     }
                // }).then(response => (alert(response.data)));
            },
            isShow:function () {
                this.show = window.localStorage.getItem("token") != null;
            }
        },
        computed:{

        },

    }
</script>

<style scoped>
    .layout{
        margin-left: 200px;
    }
    .content {
        padding: 0 16px 16px;
    }
    .header {
        background-color: #ffffff;
        box-shadow: 2px 3px 2px rgba(0, 0, 0, .1);
    }
</style>
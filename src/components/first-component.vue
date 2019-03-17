<template>
    <div>
        <Sider></Sider>
        <Layout class="layout">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <Input search placeholder="Enter something..." style="width:50%"/>
                <div class="demo-avatar-badge" style="float: right">
                    <Dropdown @on-click="logoff">
                        <Badge :count="1" :offset=[45,5]>
                            <Avatar shape="square" icon="ios-person" />
                        </Badge>
                        <DropdownMenu slot="list">
                            <DropdownItem>驴打滚</DropdownItem>
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
</template>

<script>
    import Sider from './sider';
    export default {
        name: 'app',
        components: {Sider},
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
                    alert('清除成功');
                    this.$router.push("/");
                }
            }
        }
    }
</script>

<style scoped>
    .layout{
        margin-left: 200px;
    }
    .content {
        padding: 0 16px 16px;
    }
</style>
<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <div class="board">
                <h1>登录</h1>
                <Input v-model="account" prefix="ios-contact" placeholder="Enter name" style="width: 200px" />
                <br/>
                <Input v-model="password" prefix="ios-alert" placeholder="Enter name" style="width: 200px" />
                <br/>
                <Radio v-model="single" style="margin-right: 90px" >记住密码</Radio>
                <a>注册</a>
                <br/>
                <Button type="primary"  style="width: 200px" @click="login">登录</Button>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "login",
        account: null,
        password: null,
        sockets: {
            receiveMessage:function (data) {
                //将json转换成json对象
                let obj = JSON.parse(data);
                //判断登录返回状态
                if (obj.type === 'LOGIN_SUCCESS') {
                    //将uuid作为token 存入localStorage
                    const token = this.$socket.id;
                    window.localStorage.setItem('token', token);
                    window.localStorage.setItem('name', this.account);
                    window.localStorage.setItem('password', this.$md5(this.password));
                    //router跳转到 /index
                    this.$router.push("/index");
                } else {
                    alert('登录失败');
                }
            }
        },
        methods:{
            //登录
            login:function () {
                //创建一个json对象
                let jsonObject = {
                    //账户名
                    account: this.account,
                    //记过md5加密后的密码
                    password: this.$md5(this.password),
                    //消息类型
                    type: 'LOGIN'
                };
                //发送消息 loginMessage 消息体是刚刚创建的json对象
                this.$socket.emit('loginMessage', jsonObject);
            }
        }
    }
</script>

<style scoped>
    .board {
        text-align: center;
        margin-top: 10%;
        margin-bottom: 10%;
    }

</style>
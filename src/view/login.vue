<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <div class="board">
                <h1 >{{title}}</h1>
                <Input v-model="account" prefix="ios-contact" placeholder="Enter name" style="width: 200px" />
                <br/>
                <Input v-model="password" prefix="ios-alert" placeholder="Enter name" style="width: 200px" />
                <br/>
                <Radio v-model="single" style="margin-right: 90px" v-show="isShow">记住密码</Radio>
                <a @click="toSign">{{sign}}</a>
                <br/>
                <Button type="primary"  style="width: 200px" @click="send">{{title}}</Button>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                account: null,
                password: null,
                title: "登录",
                sign: "注册",
                isShow: true,//标识登录与注册的切换状态
            };
        },
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
                    this.$Message.success('登录成功');
                    //router跳转到 /index
                    this.$router.push("/index");
                } else if (obj.type === 'SIGN_SUCCESS') {
                    this.$Message.success('注册成功');
                    // alert('注册成功');
                } else if (obj.type === 'SIGN_FAILED') {
                    this.$Message.error('注册失败');
                    // alert('');
                } else if (obj.type === 'LOGIN_FAILED') {
                    this.$Message.error('登录失败');
                    // alert("登录失败");
                }
            }
        },
        methods:{
            send:function () {
                //创建一个json对象
                let jsonObject = {
                    //账户名
                    account: this.account,
                    //记过md5加密后的密码
                    password: this.$md5(this.password),
                };
                if (this.isShow) {
                    //发送消息 loginMessage 消息体是刚刚创建的json对象
                    this.$socket.emit('loginMessage', jsonObject);
                } else {
                    this.$socket.emit('signMessage', jsonObject);
                }

            },
            toSign: function () {
                if (this.isShow) {
                    this.title = "注册";
                    this.sign = "登录";
                } else {
                    this.title = "登录";
                    this.sign = "注册";
                }
                this.isShow = !this.isShow;
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
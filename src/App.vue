<template>
  <div id="app">
      <Main/>
  </div>
</template>

<script>

    import Main from './view/main';

    export default {
        name: 'app',
        components: {Main},

        updateBySocket() {
            this.$socket.removeAllListeners();
            this.$socket.on('receiveMsg', (data) => {
                let from_user = data.from_user;
                //如果当前页面为与from_user的对话框，则交由对话框页面处理
                if (this.$route.query.chatwith === from_user) {
                    return;
                }
                this.update_chatList(data);
            })
        }

    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>

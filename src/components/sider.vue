<template>
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
        <Menu active-name="1-2" :theme=theme width="auto" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    菜单1
                </template>
                <MenuItem name="1-1" to="/index">聊天界面</MenuItem>
                <MenuItem name="1-2" to="/circle">朋友圈</MenuItem>
                <MenuItem name="1-3">Option 3</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    菜单2
                </template>
                <MenuItem name="2-1" to="/123">
                        Option 1
                </MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>

        </Menu>
    </Sider>
</template>

<script>
    export default {
        name: "sider",
        props:{
            theme:{
                //light、dark、primary
                type: String,
                default: 'dark'
            }
        }

    }
</script>

<style scoped>

</style>
<template>
    <div class="title">
        <span>
            <span><b>{{currentName}}</b></span>
            <Dropdown style="float: right">
                <a style="color: #fff">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon type="ios-arrow-down"/>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>无敌铁头功</DropdownItem>
                    <DropdownItem>无敌铁头功</DropdownItem>
                    <DropdownItem disabled>无敌铁头功</DropdownItem>
                    <DropdownItem divided>无敌铁头功</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </span>
    </div>
</template>

<script>
    export default {
        name: "title-bar",
        props:{
            currentName:{
                type:String,
                default:"没有朋友"
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
</style>
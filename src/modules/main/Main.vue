<template>
  <div id="nav">
    <div class="date">{{dateStr}}</div>
    <div class="nav-text">
      <router-link to="/">待办事项</router-link>
      <router-link to="/finished">已完成</router-link>
    </div>
    <router-link to="/add"><span>新建</span></router-link>
  </div>
  <div class="content">
    <span class="close enable-click" @click="closeMain">×</span>
    <div class="content-manage">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { closeMain } from '../../utils/useIPC.js'
export default {
  setup () {
    const date = new Date()
    const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    return {
      closeMain,
      dateStr
    }
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  height: 100%;
  width: 100%;
}
#app{
  height: 100%;
  width: 100%;
  display: flex;
}
#nav{
  padding: 50px 0;
  width: 200px;
  background-color: #f8f8f8;
  color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  a{
    text-decoration: none;
    color:#333;
    padding: 8px 20px;
    border-radius: 5px;
    &.router-link-exact-active{
      background-color: #31c27c;
      color: #fff;
    }
  }
  .date{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #31c27c;
  }
  .nav-text{
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction:column;
  }
}
.content{
  flex: 1;
  padding-top: 20px;
  .content-manage{
    box-sizing: border-box;
    padding: 50px;
    height: 100%;
    width: 100%;
    font-size: 14px;
  }
  .close{
    font-size: 26px;
    float: right;
    margin-right: 30px;
    cursor: pointer;
  }
}
</style>

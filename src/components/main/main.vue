<template>
  <div class="main">  
    <div class="tab">
      <router-link tag="a" to="/goods">商品</router-link>
      <router-link tag="a" to="/ratings">评论</router-link>
      <router-link tag="a" to="/seller">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
export default {
  props:['seller']
}
</script>
<style>
.main {
  background-color: #fff;
}
.main
.tab {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, .1);
}

.tab a {
  flex: 1;
  text-align: center;
  font-size: .7rem;
  color: rgb(77, 85, 93);
  display: block;
}
.tab a.active {
  color: rgb(250, 20, 20);
}

</style>

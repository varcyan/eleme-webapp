<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease cart-item"        
          v-show="food.count>0"
          @click.stop.prevent="minusCart($event)">
          <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count cart-item" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add cart-item icon-add_circle"
         @click.stop.prevent="addCart($event)">
         <span class="inner "></span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    // 增加
    addCart (event) {
      // 处理pc端触发两次点击事件
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('touchadd', event.target);
    },
    // 减少
    minusCart (event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}
</script>
<style>

</style>

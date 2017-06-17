<template>
  <div class="shopcar">
    <div class="content">
      <div class="con-left">
        <div class="icon-car-wrap">
          <div class="icon-car" :class="{'active': totalCount > 0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div v-show="totalCount > 0" class="sel-num">{{totalCount}}</div>
        </div>
        <div class="shop-price" :class="{'active': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="shop-desc">另需配送费 {{ delivery }} 元</div>
      </div>
      <div class="con-right" :class="{'active': payClass}">
        <div class="pay">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 选取了的内容 （计算依赖于它！）
    'selcetFoods': {
      type: Array,
      default () {
        return [
          {
            price: 1,
            count: 50
          }
        ];
      }
    },
    'delivery': {
      type: Number,
      default: 0
    },
    'minPrice': {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 总价
    totalPrice () {
      let total = 0;
      this.selcetFoods.forEach((food) => {
        total += food.price * food.count;
      })
      return total;
    },
    // 总数目
    totalCount () {
      let count = 0;
      this.selcetFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 结算描述
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.totalPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 结算class
    payClass () {
      if (this.totalPrice >= this.minPrice) {
        return true;
      }
      return false;
    }
  }
}
</script>
<style>

</style>

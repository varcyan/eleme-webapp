<template>
  <div>
  <div class="shopcar">
    <div class="content" @click="toggleList">
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
      <div class="con-right" :class="{'active': payClass}" @click.stop.prevent="pay">
        <div class="pay">{{ payDesc }}</div>
      </div>
    </div>
    <div class="ball-containter">
      <transition v-for="ball,key in balls" 
              name="drop"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:after-enter="afterEnter"
              :key="key">
        <div class="ball" v-show="ball.show" >
            <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="shopcart-list"
            v-show="listShow">
        <div class="list-header">
          <h3 class="title">购物车</h3>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" id="listcon-hook">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price*food.count }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
  </transition>
  </div>
</template>
<script>
import cartcontrol from '@/components/main/cart-control'
import BScroll from "better-scroll"
export default {
  props: {
    // 选取了的内容 （计算依赖于它！）
    'selectFoods': {
      type: Array,
      default () {
        return [];
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
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropedBalls: [],
      fold: true
    }
  },
  computed: {
    // 总价
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      })
      return total;
    },
    // 总数目
    totalCount () {
      let count = 0;
      this.selectFoods.forEach((food) => {
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
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick (() => {
          if (!this.scroll) {
            let el = document.getElementById('listcon-hook');
            this.scroll = new BScroll(el, {
              click: true,
              snap: true
            }) 
          } else {
            this.scroll.refresh();
          }
        })
      }
      return show;
    }
  },
  methods: {
    drop (el) {
      for (let i=0; i<this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropedBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter (el) {
      console.log('beforeEnter')
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left * (1 / window.devicePixelRatio) - 1.6;
          let y = -(window.innerHeight - rect.top * (1 / window.devicePixelRatio) - 1.1);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0, ${y}rem, 0)`;
          el.style.transform = `translate3D(0, ${y}rem, 0)`;
          let inner = el.querySelector('.innter-hook');
          inner.style.webkitTransform = `translate3d(${x}rem, 0, 0)`;
          inner.style.transform = `translate3d(${x}rem, 0, 0)`;
        }
      }
    },
    enter (el) {
      // 主动触发浏览器重绘
      let rf = el.offsetHeight;
      this.$nextTick (() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3D(0, 0, 0)';
        let inner = el.querySelector('.innter-hook');
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      })
    },
    afterEnter (el) {
      let ball = this.dropedBalls.shift();
      if (ball) {
        ball.show = false;
      }
      el.style.display = 'none';
    },
    toggleList () {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty () {
      this.selectFoods.forEach ((food) => {
        food.count = 0;
      })
    },
    hideList () {
      this.fold = true;
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`你需要支付${this.totalPrice}元`);
    }
  }
}
</script>
<style>

</style>

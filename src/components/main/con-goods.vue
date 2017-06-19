<template>
  <div class="goods">
    <div class="menu-wrapper" id="menu-wrap-hook">
      <ul class="menu-list">
        <li class="menu-item" 
            v-for="item,index in goods" 
            :class="{'current': currentIndex===index}"
            @click="selectMenu(index, $event)">
          <span class="text sp-item">
            <span v-show="item.type>0" 
                  class="icon" 
                  :class="classMap[item.type]"></span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="foods-wrap-hook">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h3 class="title">{{ item.name }}</h3>
          <ul class="foodlist-wrap">
            <li v-for="food in item.foods" class="food-item"
            @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h4 class="name">{{ food.name }}</h4>
                <div class="desc" v-if="food.description">{{ food.description }}</div>
                <div class="extra">
                  <span>月售{{ food.sellCount }}分</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                  <span class="old-price" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol :food="food"
                  v-on:touchadd="cartadd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcar :select-foods="selectFoods" :delivery="seller.deliveryPrice" 
    :min-price="seller.minPrice"
    ref="shopcar"></shopcar>
    <foodview :food="selected" ref="foodview"></foodview>
  </div>
</template>
<script>
import shopcar from '@/components/main/shopcar'
import foodview from '@/components/main/food'
import cartcontrol from '@/components/main/cart-control'
import BScroll from "better-scroll"
const ERR_OK = 0;
export default {
  components: {
    shopcar,
    cartcontrol,
    foodview
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],  // 每个列表的高度
      scrollY: 0,
      selected: {}
    }
  },
  computed: {
    // 获取当前所在的区间范围
    currentIndex () {
      for (let i=0; i<this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY <height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      let foods = [];
      this.goods.forEach ((item) => {
        item.foods.forEach ((food) => {
          if (food.count) {
            foods.push(food);
          }
        })
      })
      return foods;
    }
  },
  created () {
    // 根据supports.type确认访问哪个
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$http.get('/api/goods').then((response) => {
      let res = response.data;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
      }
      // DOM 真正渲染完成后
      this.$nextTick(() => {
        this.initScroll();
        this.calculateHeight();
      })
    })
  },
  methods: {
    initScroll () {
      this.menuScroll = new BScroll (document.getElementById('menu-wrap-hook'), {
        click: true,   // 允许事件
        momentumLimitDistance: 8
      })
      this.foodsScroll = new BScroll (document.getElementById('foods-wrap-hook'), {
        click: true, 
        probeType: 3,  // 可以拿到滚动的数值
        momentumLimitDistance: 8
      })
      // 监听滚动
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    calculateHeight () {
      let foodList = document.querySelector('#foods-wrap-hook').querySelectorAll('.food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i=0; i<foodList.length; i++) {
        let item =foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu (index, event) {
      // 为了再切换到pc视图时，点击事件触发两次
      if (!event._constructed) {
        // 如果pc端 监听到 event._constructed
        return;
      }
      let foodList = document.getElementById('foods-wrap-hook').querySelectorAll('.food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    balldrop (target) {
      // console.log(this.$refs.shopcart)
      // this.$refs.shopcart.drop(target);
    },
    cartadd (target) {
      this.balldrop(target);
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return;
      }
      this.selected = food;
      this.$refs.foodview.show();
    }
  }
}
</script>
<style>

</style>

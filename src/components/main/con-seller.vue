<template>
  <div class="sellers">
    <div class="seller-wrap" id="seller-wrap-hook">
      <div class="seller-content">
        <div class="seller-overview seller-fir">
          <h3 class="title">{{seller.name}}</h3>
          <div class="desc">
            <div class="star-wrapper">
              <star :score="seller.score"></star>
            </div>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="remark-item">
              <h4>起送价</h4>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="remark-item">
              <h4>商家配送</h4>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="remark-item">
              <h4>平均配送时间</h4>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite($event)">
            <span class="icon-favorite" :class="{'active':isfavorite}"></span>
            <span class="fav-text">{{favoriteText}}</span>
          </div>
        </div>
        <div class="seller-overview seller-act">
          <h3 class="title">公告与活动</h3>
          <div class="content-wrap">
            <p class="content">{{seller.bulletin}}</p>
            <ul v-if="seller.supports" class="supList">
              <li class="supList-item sp-item" v-for="item in seller.supports" :key="item.id">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="seller-overview seller-pic">
          <h3 class="title">商家实景</h3>
          <div class="pic-wrapper">
            <ul class="pic-list">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" alt="">
              </li>
            </ul>
          </div>
        </div>
        <div class="seller-overview seller-infos">
          <h3 class="title">商家信息</h3>
          <ul>
            <li class="info-item" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import star from '@/components/main/star'
import BScroll from 'better-scroll'
// import {savaToLocal} from '@/assets/js/store'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      scroll: null,
      ul: null,
      picScroll: null,
      isfavorite: false
    }
  },
  computed: {
    favoriteText () {
      return this.isfavorite ? '已收藏' : '收藏';
    }
  },
  created () {
    // 根据supports.type确认访问哪个
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this.$nextTick(()=> {
      if (this.seller.pics) {
        let el = document.querySelector('.pic-item');
        let picWidth = el.offsetWidth;
        let picMargin = parseInt(window.getComputedStyle(el)['margin-right']);
        // console.log(picWidth, picMargin);
        let width = (picWidth + picMargin) * this.seller.pics.length - picMargin;
        this.ul = document.querySelector('.pic-list');
        this.ul.style.width = width + 'px';
        this.$nextTick(()=> {
          if (!this.picScroll) {
            let el = document.querySelector('.seller-pic .pic-wrapper');
            this.picScroll = new BScroll (el, {
              scrollX: true,
              snap: true,
              click: true
            })
          } else {
            this.picScroll.refresh();
          }
        })
      }
    })
  },
  watch: {
    'seller' () {
      this.initscroll();
    }
  },
  methods: {
    toggleFavorite (event) {
      if (!event._constructed) {
        return;
      }
      this.isfavorite = !this.isfavorite;
      // savaToLocal(this.seller.id, 'favorite', this.isfavorite)
    },
    initscroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          let el = document.querySelector('#seller-wrap-hook');
          this.scroll = new BScroll (el, {
            snap: true,
            click: true,
            momentumLimitDistance: 8
          })
        } else {
          this.scroll.refresh();
        }
      })
    }
  },
  ready () {
    this.initscroll();
  },
  components: {
    star
  }
}
</script>
<style>

</style>

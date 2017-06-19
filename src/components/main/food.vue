<template>
  <transition name="fly">
    <div v-show="showFlag" class="foodview" id="foodv-hook">
      <div class="fview">
        <div class="fview-img-header">
          <img :src="food.image">
          <div class="back" @click.stop.prevent="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div>
          <div class="fview-item fview-seller">
            <h3 class="f-title">{{ food.name }}</h3>
            <div class="f-detail">
              <span class="f-sell-count">月售{{ food.sellCount }}份</span>
              <span class="f-rating">好评率{{ food.rating }}</span>
            </div>
<div class="f-price">
              <span class="new">￥{{ food.price }}</span>
              <span class="old" v-show="food.oldPrice">{{ food.oldPrice }}</span>
            </div>
            <div class="shopgo">
               <div class="cartcontrol-wrap shopgo-item">
                <cartcontrol :food="food"></cartcontrol>
              </div>
              <transition name="fade">
                <div class="fv-buy shopgo-item"
                      v-show="!food.count || food.count===0"
                      @click.stop.prevent="addFir($event)">加入购物车</div>
              </transition>
            </div>
          </div>
          <div class="fview-item fview-intro">
            <h3 class="f-title">商品介绍</h3>
            <div class="f-detail">
              {{food.info}}
            </div>
          </div>
          <div class="fview-item fview-comment">
            <h3 class="f-title">商品评价</h3>
            <rating :comment-type="commentType"
                    :only-content="onlyContent"
                    :desc="desc" :ratings="food.ratings"
                    v-on:changeCommentType="reCommentType"
                    v-on:changeOnlyContent="reOnlyContent"></rating>
            <div class="rating-wrapper">
              <ul v-if="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                  <div class="user">
                    <div class="user-name">{{rating.username}}</div>
                    <img :src="rating.avatar" alt="" class="user-img" width="28">
                  </div>
                  <div class="time">{{rating.rateTime | formatDateNow}}</div>
                  <p class="text">
                    <span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-else>暂无评论( ′－`)</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </transition>
   
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll'
import cartcontrol from '@/components/main/cart-control'
import rating from '@/components/main/rating'
import {formatDate} from '@/assets/js/formatDate'
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  components: {
    cartcontrol,
    rating
  },
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      commentType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.commentType = ALL;
      this.onlyContent = true;
      this.$nextTick (() => {
        if (!this.scroll) {
          let el = document.querySelector('#foodv-hook');
          this.scroll = new BScroll (el, {
            snap: true,
            click: true
          })
          console.log(this.commentType);
        } else {
          this.scroll.refresh();
        }
      })
    },
    hide() {
      this.showFlag = false;
    },
    addFir (event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    },
    reCommentType (type) {
      this.commentType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    reOnlyContent () {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.commentType === ALL ) {
        return true;
      } else {
        return type === this.commentType;
      }
    }
  },
  filters: {
    formatDateNow (time) {
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  }
}
</script>
<style>

</style>

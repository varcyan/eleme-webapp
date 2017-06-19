<template>
  <div class="comments" id="">
    <div id="comments-hook" class="comments-wrap">
      <div class="comments-content">
        <div class="overview o-fir">
          <div class="overview-left">
            <h3 class="score">{{seller.score}}</h3>
            <div class="score-desc">综合评分</div>
            <div class="score-diff">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <div class="star-wrapper">
                <star class="star" :score="seller.serviceScore"></star>
              </div>
              <span class="score-text">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">物流速度</span>
              <div class="star-wrapper">
                <star class="star" :score="seller.foodScore"></star>
              </div>
              <span class="score-text">{{seller.foodScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">送达时间</span>
              <span class="send-time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="overview o-rate">
          <ratinghead :comment-type="commentType"
                      :only-content="onlyContent"
                      :ratings="ratings"
                      v-on:changeCommentType="reCommentType"
                      v-on:changeOnlyContent="reOnlyContent"></ratinghead>
          <div class="rates-wrapper">
            <ul>
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rates-item">
                <div class="avatar">
                  <img :src="rating.avatar" alt="" width="56" >
                </div>
                <div class="content">
                  <h4 class="name">{{rating.username}}</h4>
                  <div class="cdesc">
                    <div class="star-wrapper">
                      <star :score="rating.score"></star>
                    </div>
                    <span class="sendTime" v-if="rating.delivery">{{rating.deliveryTime}}</span>
                  </div>
                  <div class="text">{{rating.text}}</div>
                  <div class="time">{{rating.rateTime | formatDateNow}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import star from '@/components/main/star'
import {formatDate} from '@/assets/js/formatDate'
import ratinghead from '@/components/main/rating'
const ALL = 2;
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      commentType: ALL,
      onlyContent: true,
      ratings: [],
      scroll: false
    }
  },
  components: {
    star,
    ratinghead
  },
  created () {
    this.$http.get('api/ratings').then((response) => {
      let res = response.data;
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        this.$nextTick (() => {
          if (!this.scroll) {
            let el = document.querySelector('#comments-hook');
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
      
         
    })
  },
  methods: {
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

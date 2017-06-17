<template>
  <div class="header">
    <div class="content-wrap">
      <div class="seller-logo">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="seller-info">
        <div class="title">
          <span class="brand">品牌</span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }} 分钟到达
        </div>
        <div v-if="seller.supports" class="support sp-item">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text" >{{ seller.supports[0].description }}</span>
          <span class="num icon-keyboard_arrow_right" 
                @click="showDetail">{{ seller.supports.length }}个
          </span>
        </div>
      </div>
    </div>
    <div class="notice-wrap icon-keyboard_arrow_right" 
         @click="showDetail">
      <span class="icon"></span>
      <div class="text">{{ seller.bulletin }}</div>
    </div>
    <div class="hd-bg">
      <img :src="seller.avatar" width="100%">
    </div>
    <transition name="fade">
      <div class="detail" 
          v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h3>{{ seller.name }}</h3>
            <div class="star-wrap">
              <star :score="seller.score"></star>
            </div>
            <div class="detail-content">
              <div class="detail-type">
                <div class="title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supList">
                  <li class="supList-item sp-item" v-for="item in seller.supports" :key="item.id">
                    <span class="icon" :class="classMap[item.type]"></span>
                    <span class="text">{{ item.description }}</span>
                  </li>
                </ul>
              </div>
              <div class="detail-type">
                <div class="title">
                  <div class="line"></div>
                  <div class="text">商家信息</div>
                  <div class="line"></div>
                </div>
                <div class="detail-seller-info">
                  {{ seller.bulletin }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
     </transition>
  </div>
</template>
<script>
import star from '@/components/main/star'
export default {
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  created () {
    // 根据supports.type确认访问哪个
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  }
}
</script>
<style>


</style>

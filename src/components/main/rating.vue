<template>
  <div class="rating">
    <div class="cm-type">
      <div class="cm-type-item all" :class="{'active':commentType===2}" @click.stop.prevent="selCommentType(2,$event)">
        {{desc.all}}<span class="num">{{ratings.length}}</span>
      </div>
      <div class="cm-type-item good" :class="{'active':commentType===0}" @click.stop.prevent="selCommentType(0,$event)">
        {{desc.positive}}<span class="num">{{positives.length}}</span>
      </div>
      <div class="cm-type-item bad" :class="{'active':commentType===1}" @click.stop.prevent="selCommentType(1,$event)">
        {{desc.negative}}<span class="num">{{negatives.length}}</span>
      </div>
    </div> 
    <div class="switch" @click.stop.prevent="toggleContent($event)">
      <span class="icon icon-check_circle" :class="{'active':onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <!--<ul class="comments">

    </ul>-->
  </div>
</template>
<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    commentType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    selCommentType (type, event) {
      if (!event._constructed) {
        return;
      }
      console.log('click sel comment type');
      // 通知让父组件修改CommentType
      this.$emit('changeCommentType', type);
    },
    toggleContent (event) {
      if (!event._constructed) {
        return;
      }
      console.log('click toggle content');      
      // 通知父组件更新onlyContent
      this.$emit('changeOnlyContent');
    }
  },
  computed: {
    positives () {
      return this.ratings.filter ((item) => {
        return item.rateType === POSITIVE;
      })
    },
    negatives () {
      return this.ratings.filter ((item) => {
        return item.rateType === NEGATIVE;
      })
    }
  }
  
}
</script>
<style>

</style>

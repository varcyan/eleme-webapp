<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" :keys="itemClass.id"></span>
  </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses () {
      let clsArr = [];
      let score = Math.floor(this.score*2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i=0; i<integer; i++) {
        clsArr.push(CLS_ON);
      }
      if (hasDecimal) {
        clsArr.push(CLS_HALF);
      }
      while (clsArr.length < LENGTH) {
        clsArr.push(CLS_OFF);
      }
      return clsArr;
    }
  }
}
</script>
<style>

</style>

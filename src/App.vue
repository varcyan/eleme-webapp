<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-main :seller="seller"></v-main>
    <!--<footer>this is footer</footer>-->
  </div>
</template>

<script>
  import Header from '@/components/header/header'
  import Main from '@/components/main/main'
  import {urlParse} from '@/assets/js/utils'

  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {
          // id: (() => {
          //   let queryParam = urlParse();
          //   console.log(queryParam);
          //   return queryParam.id
          // })()
        }
      }
    },
    components: {
      'v-header':Header,
      'v-main':Main
    },
    created () {
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
        let res = response.data;
        if (res.errno === ERR_OK) {
          this.seller = res.data;
          // this.seller =Object.assign({},this.seller);
        }
      })
    }
  }
</script>

<style>

</style>
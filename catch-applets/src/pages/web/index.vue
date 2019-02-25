<template>
  <web-view :src="url"></web-view>
</template>

<script>
  export default {
    name:'web',
    data(){
      return {
        url:''
      }
    },
    mounted:function () {
      console.log(this.$root.$mp.query)
      this.url = this.$root.$mp.query.url
    }
  }
</script>

<style>

</style>

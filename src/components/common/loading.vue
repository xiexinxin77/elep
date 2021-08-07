<template>
  <div class="loading_container" v-if="show">
    <div class="loading"></div>
    <div class="loading_text">{{loadingText}}</div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  data() {
    return {
      show: false,
      loadingText: '加载中...'
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss'; 
.loading_container {
  @include center;
  .loading {
    @include wh(3rem, 3rem);
    border-radius: 100%;
    border: 5px #ddd solid;
    border-right-color: $blue;
    animation: loading 1s linear infinite;
  }
  .loading_text {
    @include sc(.4rem ,#333);
    text-align: center;
    margin-top: .3rem;
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
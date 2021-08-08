<template>
  <div class="page_contaienr">
    <head-top goBack='true' head-title='购买记录'></head-top>
    <section class="invoice_container">
      <img src="../../../images/no-log.png">
      <p>没有购买记录</p>   
    </section>
  </div>
</template>
<script>
import headTop from 'components/header/header'
export default {
  components: {
    headTop
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.page_contaienr {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 202;
  background-color: #fff;
  padding-top: 1.95rem;
  .invoice_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      @include wh(8rem, 5rem);
      margin-top: 5rem;
    }
    p {
      @include sc(.6rem, #999);
      margin-top: .8rem;
    }
  }
}
</style>
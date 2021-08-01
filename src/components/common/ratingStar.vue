<template>
  <div class="rating_container">
    <section class="star_container">
      <svg class="grey_fill" v-for="num in 5" :key="num">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
      </svg>
    </section>
    <div :style="'width:' + rating*2/5 + 'rem'" class="star_overflow">
      <section class="star_container" >
        <svg  class="orange_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
        </svg>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props:['rating']
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.rating_container {
  position: relative;
  @include wh(2rem, .4rem);
  .star_overflow {
    position: relative;
    overflow: hidden;
    height: .4rem;
  }
  .star_container {
    display: flex;
    position: absolute;
    @include wh(2rem, .4rem);
     .grey_fill{
        fill: #d1d1d1;
      }
      .orange_fill{
        fill: #ff9a0d;
      }
  }
}
</style>
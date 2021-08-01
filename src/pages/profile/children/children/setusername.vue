<template>
  <div class="rating_page">
    <head-top goBack='true' head-title='修改用户名'></head-top>
    <div class="setname">
      <input :class="{border_color: error}" type="text" placeholder="输入用户名" @change="onInput" v-model="inputValue">
      <div>
        <p v-if="!error">用户名只能修改一次（5-24字符之间）</p>
        <p v-else class="error">用户名长度在5到24位之间</p>
      </div>
      <div class="submit_btn" :class="{fontopacity: opacityall}" @click="resetname">确认修改</div>
    </div>
  </div>
</template>
<script>
import headTop from '../../../../components/header/header'
import {mapMutations} from 'vuex'
export default {
  components: {
    headTop
  },
  computed: {
    opacityall() {
      return this.error || !this.inputValue
    }
  },
  data() {
    return {
      error: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations(['RESET_NAME']),
    onInput() {
      if (this.inputValue.length < 5 || this.inputValue.length > 24) {
        this.error = true;
      } else {
        this.error = false
      }
    },
    resetname() {
      this.onInput()
      if (this.error) {
        return
      }
      this.RESET_NAME(this.inputValue)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 202;
  padding-top: 1.95rem;
  .setname {
    width: 15.2rem;
    margin: .6rem auto;
    input {
      display: block;
      width: 15.2rem;
      border: 1px solid #ddd;
      padding: .2rem .1rem;
      border-radius: 2px;
      @include sc(.7rem, #333);
      
    }
    div p {
      @include sc(.4rem, #666);
      padding: .4rem .1rem;
    }
    .error {
      color: red;
    }
    .border_color {
      border-color: red;
    }
    .submit_btn {
      width: 98%;
      background-color:$blue;
      @include sc(.7rem, #fff);
      text-align: center;
      line-height: 1.5;
      padding: .5rem 0;
      margin-top: .5rem;
    }
    .fontopacity {
      transition: all 1s;
      opacity:1;
    }
  }
}
</style>
<template>
  <div class="blance_container">
    <head-top goBack='true' head-title='我的余额'></head-top>
    <div class="top_container">
      <div class="top">
        <div class="header">
          <span class="blance">当前余额</span>
          <span class="des">
            <img src="../../images/description.png" height="24" width="24">
            余额说明
          </span>
        </div>
        <div class="amount">
          <span>99.9</span>
          元
        </div>
        <div class="btn">提现</div>
      </div>
    </div>
    <div class="bottom">
      <div class="header">
        交易明细
      </div>
      <div class="on_log">
        <img src="../../images/no-log.png">
        <p>暂无明细记录</p>
      </div>
    </div>
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
.blance_container {
  .top_container {
    background-color: $blue;
    padding: .6rem .3rem;
    padding-top: 1.95rem;
    .top {
      background-color: #fff;
      border-radius: 5px;
      padding: .5rem .3rem;
      .header {
        @include fj;
        .blance {
          @include sc(.55rem, #666);
        }
        .des {
          @include sc(.55rem, $blue);
          img {
            vertical-align: middle;
          }
        }
      }
      .amount {
        @include sc(.7rem, #333);
        span {
          @include sc(1.8rem, #333);
        }
      }
      .btn {
        @include sc(.8rem, #fff);
        background-color: #ccc;
        padding: .6rem;
        margin-top: 1rem;
        text-align: center;
        border-radius: 5px;
      }
    }
  }
  .bottom {
    .header {
      padding: .5rem;
      @include sc(.6rem, #999);
    }
    .on_log {
      text-align: center;
      img {
        @include wh(8rem, 5rem);
      }
      p {
        @include sc(.7rem, #666);
        margin-top: .5rem;
      }
    }
  }
}
</style>
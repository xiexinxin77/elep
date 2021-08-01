<template>
  <div class="benefit_container">
    <head-top goBack='true' head-title='我的优惠'></head-top>
    <div class="benefit_header">
      <span :class="{choosed: categoryType==1}" @click="categoryType=1">红包</span>
      <span :class="{choosed: categoryType==2}" @click="categoryType=2">商家代金券</span>
    </div>
    <transition name="router-fade">
      <div class="hongbao_container" v-if="categoryType == 1">
        <div class="hongbao_header">
          <span>有3个红包即将到期</span>
          <span class="desc">
            <img src="../../images/description.png" height="24" width="24">
            红包说明
          </span>
        </div>
        <ul>
          <li class="hongbao_item" v-for="item in hongbaoList" :key="item.id">
            <div class="item_top">
              <div class="item_left">
                <p class="amount">${{item.amount}}</p>
                <p>{{item.description_map.sum_condition}}</p>
              </div>
              <div class="item_right">
                <div class="left">
                  <p class="share">{{item.name}}</p>
                  <p>{{item.description_map.validity_periods}}</p>
                  <p>{{item.description_map.phone}}</p>
                </div>
                <div class="right">
                  <p>{{item.description_map.validity_delta}}</p>
                </div>
              </div>
            </div>
            <div class="item_bottom" v-if="item.limit_map">
              {{item.limit_map.restaurant_flavor_ids}}
            </div>
          </li>
        </ul>
        <div class="history_hongbao">
          <span class="check_history">查看历史红包</span>
          <svg class="history_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
        <footer class="hongbao_footer">
          <router-link to="/benefit/exchange" class="hongbao_style" style="border-right: 1px solid #f5f5f5">
              兑换红包
          </router-link>
          <router-link to="/benefit/commend" class="hongbao_style">
              推荐有奖
          </router-link>
        </footer>
      </div>
    </transition>
    <transition name="router-fade">
      <div class="voucher_container" v-if="categoryType==2">
        <div class="unable_use">
          <img src="../../images/voucher.png" height="170" width="300">
          <p>无法使用代金券</p>
          <p>非客户端或客户端版本过低</p>
          <router-link to="/download" class="download_app">
          下载或升级客户端
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import headTop from 'components/header/header'
import {mapState} from 'vuex'
import {getHongbaoNum} from 'src/service/getData'
export default {
  components: {
    headTop
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    async userInfo() {
      if (this.userInfo) {
        this.hongbaoList = await getHongbaoNum(this.userInfo.user_id)
      }
    }
  },
  data() {
    return {
      hongbaoList: [], // 红包列表
      categoryType: 1 // 红包与商家代金券切换
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.benefit_container {
  padding-top: 1.95rem;
  p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
  }
  .benefit_header {
    @include fj;
    height: 2rem;
    background-color: #fff;
    span {
      flex: 1;
      line-height: 2rem;
      text-align: center;
      @include sc(.2rem,#333);
    }
    .choosed {
      border-bottom: 1px solid $blue;
      color: $blue;
    }
  }
  .hongbao_container {
    padding: .4rem;
    .hongbao_header {
      @include fj;
      height: 2rem;
      @include sc(.5rem, #666);
      span {
        height: 100%;
        line-height: 2rem;
      }
      img {
        vertical-align: middle;
        @include wh(.6rem, .6rem);
      }
      .desc {
        @include sc(.5rem, $blue);
      }
    }
    ul {
      .hongbao_item {
        border-radius: 5px;
        border: 1px solid #ddd;
        margin-bottom: .5rem;
        .item_top {
          @include fj;
          background-color: #fff;
          padding: 1rem .2rem;
        }
        .item_left {
          flex: 1.4;
          border-right: 1px solid #ddd;
          p {
            @include sc(.4rem, #ccc);
          }
          .amount {
            @include sc(1.4rem, $red);
          }
        }
        .item_right {
          flex: 4;
          @include fj;
          .left {
            padding: 0 .5rem;
            p {
              @include sc(.4rem, #999);
            }
            .share {
              @include sc(.75rem, #666);
            }
          }
          .right {
            p {
              @include sc(.75rem, $red)
            }
          }
        }
        .item_bottom {
          @include sc(.4rem, #999);
          margin-top: .6rem;
          margin-left: .5rem;
          margin-bottom: .5rem;
        }
      }
    }
    .history_hongbao {
      padding: .5rem 0 2.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .check_history {
        @include sc(.5rem, #999);
      }
      .history_right {
        @include wh(.4rem,.4rem);
        fill: #aaa;
        margin-left: .4rem;
      }
    }
    .hongbao_footer {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      @include fj;
      background-color: #fff;
      height: 2rem;
      .hongbao_style {
        flex: 1;
        line-height: 2rem;
        text-align: center;
        @include sc(.7rem, #555);
      }
    }
  }
  .voucher_container {
    margin-top: 3rem;
    .unable_use {
      text-align: center;
      margin-top: 4rem;
      img{
        @include wh(6rem, 3.4rem);
      }
       p:nth-of-type(1){
        @include sc(.7rem, #666);
        margin-top: .4rem;
      }
      p:nth-of-type(2){
        @include sc(.5rem, #999);
        margin-top: .3rem;
        margin-bottom: .3rem;
      }
      .download_app{
        background-color: #56d176;
        @include sc(.65rem, #fff);
        padding: .3rem;
        border-radius: .15rem;
      }
    }
  }
  .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
}
</style>
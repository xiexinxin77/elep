<template>
  <div>
    <img src="https://i0.hdslb.com/bfs/face/fbbdc8d208b94a97e7540cebe6aca42c5f1c36ad.jpg@160w_160h_1c_1s.webp" alt="">

    <head-top signin-up='home'>
      <span slot='logo' class="head_logo">ele.me</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_top">
        <span>当前定位城市:</span>
        <span>定位不准确时,请在城市列表中选择</span>
      </div>
      <router-link class="city_guess" :to="'/city/' + guessCityId">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>
    <div class="hot_city">
      <h4 class="city_title">热门城市</h4>
      <ul class="clear citylistul">
        <router-link tag="li" v-for="item in hotCity" :key="item.id" :to="'/city/' + item.id">
        {{item.name}}
        </router-link>
      </ul>
    </div>
    <div class="group_city">
      <ul class="group_ul">
        <li class="group_li" v-for="(value, key) in sortedGroupCity" :key="key">
          <h4 class="city_title">
            {{key}}
          </h4>
          <ul class="clear citylistul">
            <router-link class="ellipsis" tag="li" v-for="item in value" :key="item.id" :to="'/city/' + item.id">
            {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {cityGuess, hotcity, groupcity} from '../../service/getData'
import headTop from '../../components/header/header'
export default {
  components: {
    headTop
  },
  data() {
    return {
      guessCity: '', //当前城市
      guessCityId: '', //当前城市id
      hotCity: [], //热门城市
      sortGroupCity: [] //分组城市
    }
  },
  computed: {
    sortedGroupCity() {
      let sortGroupCity = {}
      for (let i = 60; i <= 90; i++) {
        if (this.sortGroupCity[String.fromCharCode(i)]) {
          sortGroupCity[String.fromCharCode(i)] = this.sortGroupCity[String.fromCharCode(i)]
        }
      }
      return sortGroupCity;
    }
  },
  mounted() {
    cityGuess().then(res => {
      this.guessCity = res.name
      this.guessCityId = res.id
    })
    hotcity().then(res => {
      this.hotCity = res
    })
    groupcity().then(res => {
      this.sortGroupCity = res
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.head_logo {
  @include ct;
  @include wh(2.3rem, .7rem);
  font-size: .7rem;
  color: #fff;
  font-weight: 400;
  left: .4rem;
}
.city_nav {
  background-color: #fff;
  margin-bottom: .4rem;
  padding-top: 2.35rem;
  .city_top {
    @include fj;
    height: 1.44rem;
    align-items: center;
    padding: 0 0.45rem;
    span:nth-of-type(1) {
      @include sc(0.55rem , #666);
    }
    span:nth-of-type(2) {
      @include sc(0.475rem, #9f9f9f);
      font-weight: 900;
    }
  }
  .city_guess {
     @include fj;
     align-items: center;
     height: 1.8rem;
     padding: 0 0.45rem;
     border-top: 1px solid $bc;
     border-bottom: 2px solid $bc;
     span {
       @include sc(0.75rem, $blue)
     }
     .arrow_right {
        @include wh(.6rem, .6rem);
        fill: #999;
     }
  }
}
.citylistul {
  li {
    float: left;
    width: 25%;
    height: 1.75rem;
    color: $blue;
    @include font(0.6rem, 1.75rem);
    border-bottom: .025rem solid #e4e4e4;
    border-right: .025rem solid #e4e4e4;
    text-align: center;
  }
}
.city_title {
  color: #666;
  font-weight: 400;
  padding-left: .45rem;
  border-top: 2px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  font: .55rem/1.45rem Helvetica Neue
}
.hot_city {
  background-color: #fff;
  margin-bottom: .4rem;
}
.group_city {
  ul {
    .group_li {
      .citylistul {
        li {
          color: #666;
        }
      }
     margin-bottom: .4rem;
     background-color: #fff;
     border-bottom: 1px solid #e4e4e4;
   }
  }
}
</style>
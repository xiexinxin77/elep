<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore">
      <router-link tag="li" :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" :key="item.id" class="shop_li clear">
        <div class="shop_left">
          <img :src="imgBaseUrl + item.image_path" class="shop_img">
        </div>
        <div class="shop_right">
          <div class="shop_detail_header">
            <h4 class="shop_title ellipsis" :class="{premium: item.is_premium}">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </div>
          <div class="rating_num">
            <div class="rating_num_left">
              <rating-star :rating="item.rating"></rating-star>
              <span class="rating_score">{{item.rating}}</span>
              <span class="order_num">月售{{item.recent_order_num}}单</span>
            </div>
            <div class="rating_num_right">
              <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>   
            </div>
          </div>
          <div class="fee_distance">
            <p class="fee">
              ¥{{item.float_minimum_order_amount}}起送
							<span class="segmentation">/</span>
							{{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
							<span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span>
							<span v-else>{{item.distance}}</span>
							<span class="segmentation">/</span>
							<span class="order_time">{{item.order_lead_time}}</span>
						</p>
          </div>
        </div>
      </router-link>
    </ul>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
  </div>
</template>
<script>
import {imgBaseUrl} from 'src/config/env'
import {mapState} from 'vuex'
import {shopList} from 'src/service/getData'
import ratingStar from './ratingStar.vue'
import {loadMore} from './mixin'
import {showBack} from 'src/config/mUtils'
export default {
  data() {
    return {
      shopListArr: [], //店铺列表
      imgBaseUrl,
      offset: 0,
      preventRepeatReuqest: false, // 到达底部加载数据,防止重复加载
      showBackStatus: false
    }
  },
  components: {
    ratingStar
  },
  props: ['geohash'],
  mixins: [loadMore],
  computed: {
    ...mapState(['latitude','longitude'])
  },
  mounted() {
    this.initData()
    showBack(value => {
      this.showBackStatus = value
    })
  },
  methods: {
    async initData() {
      let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.shopListArr = [...res];
    },
    async loaderMore() {
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true
      this.offset += 10;
      
      let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.shopListArr = [...this.shopListArr, ...res];
      this.preventRepeatReuqest = false
    },
    backTop() {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.shoplist_container {
  background-color: #fff;
  .shop_li {
    padding: .7rem;
    border-bottom: 0.025rem solid #f1f1f1;
    .shop_left {
      float: left;
      img {
        @include wh(2.7rem, 2.7rem);
      }
    }
    .shop_right {
      float: right;
      .premium::before{
				content: '品牌';
				display: inline-block;
				font-size: 0.5rem;
				line-height: .6rem;
				color: #333;
				background-color: #ffd930;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
			}
      .shop_detail_header {
        display: flex;
        justify-content: space-between;
        .shop_title {
          width: 8.5rem;
          color: #333;
          font-weight: 700;
          @include font(0.65rem,0.65rem);
        }
        .shop_detail_ul {
          li {
            float: left;
            @include sc(.5rem, #999);
            border: .025rem solid #f1f1f1;
            border-radius: 0.08rem;
            padding: 0 0.04rem;
          }
        }
      }
      .rating_num {
        @include fj;
        margin-top: .6rem;
        .rating_num_left {
          @include fj;
          .rating_score {
            @include sc(0.4rem, #ff6000);
          }
          .order_num {
            @include sc(.4rem, #666);
          }
        }
        .rating_num_right {
          @include sc(0.4rem, #fff);
          .delivery_style {
            @include sc(0.4rem, #fff);
            padding: 0.04rem 0.08rem 0;
            border-radius: 0.08rem;
            margin-left: 0.08rem;
          }
          .delivery_left {
            background-color: #3190e8;
            border: 1px solid #3190e8;
          }
        }
      }
      .fee_distance {
        margin-top: .6rem;
        @include fj;
        .fee {
          width: 5rem;
          @include sc(.5rem, #666);
        }
        .distance_time {
          width: 5rem;
          @include sc(.5rem, #666);
          span{
            color:#999;
          }
          .order_time {
            color: #3190e8;
          }
        }
      }
    }
  }
  .return_top {
    position: fixed;
    right: .8rem;
    bottom: 2rem;
    .back_top_svg {
      @include wh(2rem, 2rem)
    }
  }
}
</style>
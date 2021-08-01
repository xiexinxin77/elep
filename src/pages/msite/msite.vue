<template>
  <div>
    <head-top signin-up='msite'>
      <div slot="search" class="search">
        <svg-icon iconName='search'></svg-icon>
      </div>
      <router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">{{msiteTitle}}</span>
			</router-link>
    </head-top>
    <nav class="msite_nav">
    	<div class="swiper-container" v-if="foodTypes.length">
		    <div class="swiper-wrapper">
		      <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
	        	<router-link :to="{path: '/food', query: {geohash, title: foodItem.title}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
	        		<figure>
	        			<img :src="imgBaseUrl + foodItem.image_url">
	        			<figcaption>{{foodItem.title}}</figcaption>
	        		</figure>
	        	</router-link>
		      </div>
		    </div>
		    <div class="swiper-pagination"></div>
		  </div>
    </nav>
    <div class="shopList_container">
      <header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">附近商家</span>
	    	</header>
      <shop-list></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
import headTop from '../../components/header/header'
import footGuide from 'src/components/footer/footerGuide'
import ratingStar from '../../components/common/ratingStar'
import shopList from '../../components/common/shopList'
import {mapMutations} from 'vuex'
import {msiteAddress, msiteFoodTypes, cityGuess} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'
import pm from '../../config/pm'
export default {
  components: {
    headTop,
    footGuide,
    ratingStar,
    shopList
  },
  computed: {

  },
  data() {
    return {
      geohash: '', //city页面传递过来的geohash
      msiteTitle: '',
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      foodTypes: [] //食品分类
    }
  },
  async beforeMount() {
    if (!this.$route.query.geohash) {
      let address = await cityGuess()
      this.geohash = address.latitude + ',' + address.longitude
    } else {
      this.geohash = this.$route.query.geohash
    }
    //保存geohash 到vuex
    this.SAVE_GEOHASH(this.geohash)
    let res = await msiteAddress(this.geohash)
    this.msiteTitle = res.name
    this.RECORD_ADDRESS(res)
  },
  mounted() {
        
    pm.init()
    msiteFoodTypes(this.geohash).then(res => {
      let resArr = [...res];
      let foodArr = [];
      for(let i = 0, j = 0; i < res.length; i+=8,j++) {
        foodArr[j] = resArr.splice(0,8)
      }
      this.foodTypes = foodArr
    }).then(() => {
      //初始化swiper
      new Swiper('.swiper-container', {
		    pagination: '.swiper-pagination',
		    loop: true
		  });
    })
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS', 'SAVE_GEOHASH'])
  }

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.search {
  .svg-icon {
    @include wh(1rem, 1rem);
    @include ct;
    left: .4rem
  }
}
.msite_title {
  .title_text {
    @include center;
    height: 1.4rem;
    width: 7.6rem;
    line-height: 1.4rem;
    @include sc(.85rem, #fff);
  }
}
.msite_nav {
 	padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
 .food_types_container {
   @include fj;
   flex-wrap: wrap;
   .link_to_food {
     @include fj;
     flex-direction: column;
     align-items: center;
     text-align: center;
     margin-bottom: 1rem;
     @include sc(.55rem, #666);
     flex: 25%;
   }
   img {
     @include wh(1.8rem, 1.8rem)
   }
 } 
}
.shop_icon{
	fill: #999;
	margin-left: 0.6rem;
	vertical-align: middle;
	@include wh(0.6rem, 0.6rem);
}
.shop_header_title{
	color: #999;
	@include font(0.55rem, 1.6rem);
}
</style>
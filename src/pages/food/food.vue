<template>
  <div class="food_container">
    <head-top goBack='true' :head-title='headTitle'></head-top>
    <div class="sort_container">
      <div class="sort_item">
        <div class="sort_item_container" @click="chooseType('food')">
          <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <div class="category_container" v-if="sortBy == 'food'">
            <div class="category_left">
              <ul>
                <li v-for="(item, index) in category" :key="index" :class="{category_active:restaurant_category_id == item.id}" class="category_left_li" @click="selectCategory(item.id, index)">
                  <section>
                    <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
							    		<path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
							    	</svg>
                  </section>
                </li>
              </ul>
            </div>
            <div class="category_right">
              <ul>
                <li v-for="(item, index) in categoryDetail" :key="index" class="category_right_li">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <div class="sort_item">
        <div class="sort_item_container" @click="chooseType('sort')">
          <span :class="{category_title: sortBy == 'sort'}">排序</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <div class="category_container" v-if="sortBy == 'sort'">
            <ul class="sort_ul" @click="sortList($event)">
              <li class="sort_li">
                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
								</svg>
	    					<p data="0" :class="{sort_select: sortByType == 0}">
	    						<span>智能排序</span>
	    						<svg v-if="sortByType == 0">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
								  </svg>
	    					</p>
              </li>
              <li class="sort_li">
                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
								</svg>
	    					<p data="1" :class="{sort_select: sortByType == 1}">
	    						<span>距离最近</span>
	    						<svg v-if="sortByType == 1">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
								  </svg>
	    					</p>
              </li>
              <li class="sort_li">
                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
								</svg>
	    					<p data="2" :class="{sort_select: sortByType == 2}">
	    						<span>销量最高</span>
	    						<svg v-if="sortByType == 2">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
								  </svg>
	    					</p>
              </li>
              <li class="sort_li">
                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
								</svg>
	    					<p data="3" :class="{sort_select: sortByType == 3}">
	    						<span>起送价最低</span>
	    						<svg v-if="sortByType == 3">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
								  </svg>
	    					</p>
              </li>
              <li class="sort_li">
                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
								</svg>
	    					<p data="4" :class="{sort_select: sortByType == 4}">
	    						<span>配送速度最快</span>
	    						<svg v-if="sortByType == 4">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
								  </svg>
	    					</p>
              </li>
              <li class="sort_li">
                <svg>
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
								</svg>
	    					<p data="5" :class="{sort_select: sortByType == 5}">
	    						<span>评分最高</span>
	    						<svg v-if="sortByType == 5">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
								  </svg>
	    					</p>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="sort_item">
        <div class="sort_item_container"  @click="chooseType('activity')">
          <span :class="{category_title: sortBy == 'food'}">筛选</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <div class="category_container filter_container" v-if="sortBy == 'activity'">
            <section>
              <header>配送方式</header>
              <ul>
                <li v-for="item in Delivery" :key="item.id" @click="selectDeliveryMode(item.id)">
                  <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
									</svg>
	    						<span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                </li>
              </ul>
            </section>
            <section>
              <header>商家属性(可以多选)</header>
              <ul>
                <li v-for="(item,index) in Activity" :key="index" @click="selectActivity(index,item.id)">
                  <svg v-show="support_ids[index].status" class="activity_svg">
									  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
									</svg>
	    						<span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
	    						<span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                </li>
              </ul>
            </section>
            <footer>
              <div class="clear_all filter_button_style" @click="clearAll">清空</div>
	    				<div class="confirm_select filter_button_style" >确定<span v-show="filterNum">({{filterNum}})</span></div>
            </footer>
          </div>
        </transition>
      </div>
    </div>
    <div class="shop">
      <shop-list :geohash="geohash"></shop-list>
    </div>
  </div>
</template>
<script>
import headTop from 'components/header/header'
import shopList from 'components/common/shopList'
import {mapState, mapMutations} from 'vuex'
import { getImgPath } from "components/common/mixin"
import {
  msiteAddress,
  foodCategory,
  foodDelivery,
  foodActivity
} from "src/service/getData"
export default {
  components: {
    headTop,
    shopList
  },
  mixins: [getImgPath],
  computed: {
    ...mapState["latitude", "longitude"]
  },
  data() {
    return {
      geohash: '',
      foodTitle: '',
      headTitle: '',
      sortBy: '',
      restaurant_category_id: '',
      category: [],
      categoryDetail: [],
      Delivery: [],
      Activity: [],
      sortByType: '',
      delivery_mode: null, // 选中的配送方式
      support_ids: [],
      filterNum: 0  
    }
  },
  mounted() {
   this.initData()
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS']),
    async initData() {
      this.headTitle = this.$route.query.headTitle
      this.foodTitle = this.$route.query.headTitle
      this.geohash = this.$route.query.geohash
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      if (!this.latitude) {
        let res = await msiteAddress(this.geohash)
        this.RECORD_ADDRESS(res)
      }
      this.category = await foodCategory(this.latitude, this.longitude);
      this.category.forEach(item => {
        if (this.restaurant_category_id == item.id) {
          this.categoryDetail = item.sub_categories;
        }
      });
      //获取筛选列表的配送方式
      this.Delivery = await foodDelivery(this.latitude, this.longitude);
      //获取筛选列表的商铺活动
      this.Activity = await foodActivity(this.latitude, this.longitude);
      this.Activity.forEach((item, index) => {
        this.support_ids[index] = { status: false, id: item.id };
      });
    },
    // 使用时间委托把p的事件委托给ul
    sortList(event) {
      let node
      if (event.target.nodeName.toUpperCase() !== 'P') {
        node = event.target.parentNode
      } else {
        node = event.target
      }
      this.sortByType = node.getAttribute('data')
    },
    chooseType(type) {
      if (this.sortBy !== type) {
        this.sortBy = type;
        //food选项中头部标题发生改变，需要特殊处理
        if (type == "food") {
          this.foodTitle = "分类";
        } else {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      } else {
        //再次点击相同选项时收回列表
        this.sortBy = "";
        if (type == "food") {
          //将foodTitle 和 headTitle 进行同步
          this.foodTitle = this.headTitle;
        }
      }
    },
    selectCategory(id, index) {
      this.restaurant_category_id = id
      this.categoryDetail = this.category[index].sub_categories
    },
    // 选择配送方式
    selectDeliveryMode(id) {
      if (!this.delivery_mode) {
        this.delivery_mode = id
        this.filterNum++
      } else if (this.delivery_mode == id) {
        this.delivery_mode = ''
        this.filterNum--
      } else {
        this.delivery_mode = id
      }
    },
    selectActivity(index, id) {
      this.support_ids[index].status = !this.support_ids[index].status
      this.filterNum = this.delivery_mode ? 1 : 0
      this.support_ids.forEach(obj => {
        if (obj.status) {
          this.filterNum++
        }
      })
    },
    clearAll() {
      this.delivery_mode = ''
      this.support_ids.forEach(item => item.status = false)
      this.filterNum = 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin.scss';
.food_container {
  padding-top: 3.6rem;
  .sort_container {
    background-color: #fff;
    border-bottom: 0.025rem solid #f1f1f1;
    position: fixed;
    top: 1.95rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
    .sort_item {
      height: 1.6rem;
      flex: 1;
      @include sc(.55rem, #444);
      text-align: center;
      line-height: 1.6rem;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      .sort_item_container {
        z-index: 999;
      }
      .sort_icon {
        vertical-align: middle;
      }
      .sort_ul {
        width: 100%;
        background-color: #f5f5f5;
      }
      .category_container {
        position: absolute;
        left: 0;
        top: 1.6rem;
        @include wh(100%, 16rem);
        display: flex;
        .category_left {
          flex: 1;
          background-color: #f1f1f1;
          overflow-y: auto;
          .category_active {
            background-color: #fff;
          }
          .category_left_li {
            @include fj;
            padding: .25rem;
            .category_count {
              background-color: #ccc;
              @include sc(.4rem, #fff);
              padding: .1rem;
              border: .025rem solid #ccc;
              border-radius: .8rem;
              vertical-align: middle;
              margin-right: .25rem;
            }
            .category_icon {
              @include wh(0.8rem, 0.8rem);
              vertical-align: middle;
              margin-right: 0.2rem;
            }
          }
        }
        .category_right {
          flex: 1;
          background-color: fff;
          overflow-y: auto;
          .category_right_li {
            @include fj;
            padding: .25rem;
            background-color: #fff;
            border-bottom: 1px solid #ddd;
          }
        }
        .sort_li {
          height: 2.5rem;
          display: flex;
          align-items: center;
          background-color: #fff;
          svg {
            @include wh(0.7rem, 0.7rem);
            margin: 0 0.3rem 0 0.8rem;
          }
          p {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e4e4e4;
            span {
              color: $blue;
            }
          }
        }
      }
      .filter_container {
        display: block;
        background-color: #f1f1f1;
        height: 11.6rem;
        section {
          padding: .2rem .5rem;
          background-color: #fff;
          header {
            @include sc(.4rem, #333);
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: left;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              display: flex;
              @include wh(4.7rem, 1.4rem);
              align-items: center;
              border: 1px solid #eee;
              border-radius: .125rem;
              padding: 0 .25rem;
              margin-bottom: .25rem;
              margin-right: .3rem;
              svg {
                @include wh(.8rem, .8rem);
                margin-right: .125rem;
              }
              span {
                @include sc(.4rem, #333);
              }
              .filter_icon {
                @include wh(.8rem, .8rem);
                font-size: .5rem;
                border: .025rem solid #e4e4e4;
                border-radius: .15rem;
                margin-right: .25rem;
                line-height: .8rem;
                text-align: center;
              }
            }
          }
        }
        footer {
          @include fj;
          padding: .2rem .5rem;
          margin: .3rem 0;
          .filter_button_style {
            flex: 1;
            height: 1.8rem;
            @include sc(.8rem, #333);
            line-height: 1.8rem;
            background-color: #fff;
            border-radius: 5px;
          }
          .clear_all {
            background-color: #fff;
            margin-right: .5rem;
            border: 1px solid #fff;
          }
          .confirm_select {
            background-color: $green;
            color: #fff;
            border: 1px solid $green;
            span {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .shop {
    height: 6rem;
  }
}
.showlist-enter-active,
.showlist-leave-active {
  transition: all 0.3s;
  transform: translateY(0);
}
.showlist-enter,
.showlist-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}

</style>
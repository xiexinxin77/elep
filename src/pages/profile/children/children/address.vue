<template>
  <div class="rating_page">
    <head-top goBack='true'>
      <span slot="edit" class="edit" @click="edit">{{editText}}</span>
    </head-top>
    <div class="address">
      <ul>
        <li class="address_item" v-for="(item, index) in addressList">
          <div>
        		<p>{{item.address}}</p>
        		<p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
        	</div>
        	<div class="deletesite" v-if="deletesite">
        		<span @click="deleteSite(index, item)">x</span>
        	</div>
        </li>
      </ul>
    </div>
    <router-link tag="div" to="/profile/info/address/add" class="add_address">
      <span>新增地址</span>
      <span class="narrow">
        <svg fill="#d8d8d8">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
				</svg>
      </span>
    </router-link>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import headTop from '../../../../components/header/header'
import {mapState, mapActions} from 'vuex'
import {deleteAddress} from 'src/service/getData'
export default {
  components: {
    headTop
  },
  computed: {
    ...mapState(['userInfo', 'addressList'])
  },
  watch: {
    userInfo() {
      this.initData()
    }
  },
  data() {
    return {
      deletesite: false,
      editText: '编辑'
    }
  },
  methods: {
    ...mapActions(['getAddressList']),
    initData() {
      if (this.userInfo.user_id) {
        this.getAddressList()
      }
    },
    edit() {
      this.deletesite = !this.deletesite
      this.editText = !this.deletesite ? '编辑' : '完成'
    },
    async deleteSite(index, item) {
      if (this.userInfo && this.userInfo.user_id) {
        await deleteAddress(this.userInfo.user_id, item.id);
        this.addressList.splice(index, 1);
      }
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
  .address {
    background-color: #fff;
    margin-top: .4rem;
    .address_item {
      @include fj;
      padding: .4rem;
      width: 100%;
      border-bottom: 1px solid #ddd;
      flex: 1;
      p {
        @include sc(.6rem, #333);
        line-height: .9rem;
      }
    }
  }
  .add_address {
    @include fj;
    align-items: center;
    padding: .4rem;
    background-color: #fff;
    margin-top: .4rem;
    @include fj;
    @include sc(.7rem, #333);
    border: 1px solid #ddd;
    .narrow{
    	@include wh(.66667rem,1.4rem);
    	svg{
    		@include wh(100%,100%);
    	}
    }
  }
  .edit {
    @include ct;
    right: .4rem;
    @include sc(.7rem, #fff);
  }
}
</style>
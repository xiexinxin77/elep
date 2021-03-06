export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
        let canLoad = function(){
          //文档内容实际高度（包括超出视窗的溢出部分）
          var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
          //滚动条滚动距离
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          //窗口可视范围高度
          var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
          
          if(clientHeight + scrollTop >= scrollHeight){
            console.log("===加载更多内容……===");
            return true
          }
          return false
        }
        el.addEventListener('touchmove', () => {
					loadMore();
				}, false)

				el.addEventListener('touchend', () => {
					loadMore()
				}, false)
        const loadMore = () => {
          if (canLoad()) {
            binding.value()
          }
        }
      }
    }
  }
}
export const getImgPath = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
		getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
		},
	}

}
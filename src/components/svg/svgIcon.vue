<template>
  <svg :fill="iconColor" class="svg-icon">
    <use :xlink:href="iconNameCp" />
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    // 图标名称
    iconName: {
      type: String,
      required: true
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: '#666'
    }
  },
  computed: {
    iconNameCp() {
      return `#${this.iconName}`
    }
  } 
}
</script>
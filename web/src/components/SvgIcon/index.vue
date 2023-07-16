<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`  //icon-class='.svg file name' ==> '#icon-.svg file name'
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className //添加样式的className
      } else {
        return 'svg-icon'
      }
    },
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

/* .svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
} */
</style>

<template>
  <div>
    <transition name="fade"
                @after-leave="showData=true">
      <div ref="placeholder"
           style="background:#eee;width:100%;height:100%"
           v-show="!data"></div>
    </transition>
    <div v-show="showData">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
<script>
  export default{
    props: ['config', 'data'],
    data () {
      return {
        showData: false
      }
    },
    watch: {
      data (curVal) {
        if (!curVal) {
          this.showData = false
        }
      }
    },
    mounted () {
      for (let key in this.config) {
        this.$refs.placeholder.style[key] = this.config[key]
      }
    }
  }
</script>

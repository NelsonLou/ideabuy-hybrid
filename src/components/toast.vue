<template>
  <div class="my-toast" v-show="show">
    <div class="toast-text">
      {{text}}（{{time}}）
    </div>
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .my-toast {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    .toast-text {
      margin-top:45vh;
      height:4rem;
      font-size: 1.4rem;
      line-height:4rem;
      padding:0 1.4rem;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      border-radius: 0.5rem;
    }
  }
</style>
<script>
  export default{
    name: 'toast',
    props: ['show', 'text'],
    data () {
      return {
        time: 3,
        timer: null
      }
    },
    watch: {
      show (curValue, oldValue) {
        if (curValue === true) {
          this.countdown()
        }
      }
    },
    methods: {
      countdown () {
        this.timer = setInterval(() => {
          this.time--
          if (this.time === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.time = 3
            this.$emit('cb')
          }
        }, 1000)
      }
    }
  }
</script>

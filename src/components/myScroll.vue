<template>
  <div style="width:100%;height:100%;position:relative">
    <div id="myScroll">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #myScroll {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
</style>
<script type="es6">
  import JRoll from 'jroll'
  import evehthub from '../assets/js/eventhub'
  export default{
    props: {
      scrollX: {default: false},
      scrollY: {default: true}
    },
    data () {
      return {
        myScroll: null
      }
    },
    methods: {
      refresh () {
        setTimeout(() => {
          this.myScroll.refresh();
        }, 0);
      },
      scrollToTop () {
        this.myScroll.scrollTo(0, 0);
      }
    },
    mounted () {
      let dom = document.querySelectorAll('#myScroll')[1] ? document.querySelectorAll('#myScroll')[1] : document.querySelectorAll('#myScroll')[0]
      this.myScroll = new JRoll(dom)
      evehthub.$on('myRouter', () => {
        this._inactive && this.scrollToTop()
      })
    }
  }
</script>

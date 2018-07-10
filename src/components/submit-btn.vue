<template>
  <div class="confirm-btn" @click="submit"
       :class="{disabled:disabled}">{{title}}
  </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    // text-align: center;
    // line-height: 88px;
    height: 88px;
    color: #fff;
    border-radius: 14px;
    background: #ff8c56;
    font-size: 28px;

    &.disabled {
      background: #dbdbdb;
      box-shadow: none;
      &:active {
        margin-top: 0;
      }
    }
  }
</style>
<script>
  export default {
//  props: ['title', 'disabled'],
    props: {
      title: {default: ''},
      disabled: {default: false}
    },
    methods: {
      submit() {
        if (!this.disabled) {
          this.$emit('submit')
        }
      }
    }
  }
</script>

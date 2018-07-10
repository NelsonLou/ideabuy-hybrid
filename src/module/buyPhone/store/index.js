const state = {
  // 选择的参数
  selectParams: {
    price: 0,
    tprice: '',
    typelist: '',
    hytime: '',
    desc: '',
    sumprice: 0,
    huafei: 1910,
    payFee: '', // 订单价格（不分期）
    number: {
      number: '',
      fee: '',
      place: '宁波'
    },
    invoice: '', // 发票抬头,
    parttime: '' // 分期期限
  },
  // 是否清除选择规格
  clearStatus: false,
  mobileStatus: false,
  isStage: false, // 是否分期
  numberVerify: 0
}

export default {
  state
}

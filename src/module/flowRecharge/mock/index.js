import Mock from 'mockjs'
import qs from 'qs'
Mock.mock(/\/flow-tags/, {
  'code': 1,
  'data': {
    tags: [
      {
        value: 1,
        label: '热推'
      }, {
        value: 2,
        label: '包月'
      }, {
        value: 3,
        label: '加油包'
      }, {
        value: 4,
        label: '半年包'
      }, {
        value: 5,
        label: '日包'
      }, {
        value: 6,
        label: '假日包'
      }, {
        value: 7,
        label: '视频包'
      }, {
        value: 8,
        label: '我的流量包'
      }
    ]
  }
})

Mock.mock(/\/flow-list/, options => {
  const para = qs.parse(options.body)
  let list = [
    {
      id: '1',
      name: '热推',
      cnt: [
        {
          title: '省内限时流量包',
          subTitle: '(仅限23:00-次日07:00)',
          color: 'yellow',
          goods: [
            {
              id: '1',
              name: '1G',
              price: '10'
            }, {
              id: '2',
              name: '3G',
              price: '15'
            }
          ]
        }, {
          title: '国内流量月包',
          color: 'blue',
          goods: [
            {
              id: '3',
              name: '100G',
              price: '50'
            }, {
              id: '4',
              name: '300G',
              price: '100',
              sale: '活动'
            }, {
              id: '5',
              name: '500G',
              price: '200'
            }
          ]
        }
      ]
    }, {
      id: '2',
      name: '包月',
      cnt: [
        {
          title: '国内流量月包',
          color: 'blue',
          goods: [
            {
              id: '3',
              name: '100G',
              price: '50'
            }, {
              id: '4',
              name: '300G',
              price: '100',
              sale: '活动'
            }, {
              id: '5',
              name: '500G',
              price: '200'
            }
          ]
        }
      ]
    }, {
      id: '3',
      name: '加油包',
      cnt: [
        {
          title: '省内限时流量包',
          subTitle: '(仅限23:00-次日07:00)',
          color: 'yellow',
          goods: [
            {
              id: '1',
              name: '1G',
              price: '10'
            }, {
              id: '2',
              name: '3G',
              price: '15'
            }
          ]
        }
      ]
    }, {
      id: '7',
      name: '视频包',
      cnt: [
        {
          title: '定向流量包',
          color: 'red',
          goods: [
            {
              id: '6',
              name: '乐视定向流量',
              price: '30'
            }, {
              id: '7',
              name: '优酷定向流量',
              price: '30'
            }, {
              id: '8',
              name: '腾讯定向流量',
              price: '30'
            }, {
              id: '9',
              name: '爱奇艺定向流量',
              price: '30'
            }
          ]
        }, {
          title: '校园定向流量包',
          color: 'green',
          goods: [
            {
              id: '10',
              name: '携程礼品包',
              price: '5'
            }, {
              id: '11',
              name: '大布阅读特权包',
              price: '15'
            }, {
              id: '12',
              name: '酷音铃声特权包',
              price: '30'
            }, {
              id: '13',
              name: '沃游戏特权包',
              price: '25'
            }
          ]
        }
      ]
    }
  ]
  let mockList = list.filter(obj => {
    if (para.id && obj.id.indexOf(para.id) === -1) {
      return false
    }
    return true
  })
  if (mockList.length) {
    mockList = list.filter(obj => obj.id === para.id)[0].cnt
  } else {
    mockList = [
      {
        title: '暂无数据'
      }
    ]
  }
  const data = {
    code: 1,
    data: {
      list: mockList
    }
  }
  return data
})

Mock.mock(/\/flow-info/, options => {
  const para = qs.parse(options.body)
  let info = [
    {
      id: '1',
      color: 'yellow',
      name: '1G',
      price: '10',
      desc: '1G流量加油包',
      title: '省内限时流量包'
    }, {
      id: '2',
      color: 'yellow',
      name: '3G',
      price: '15',
      desc: '3G流量加油包',
      title: '省内限时流量包'
    }, {
      id: '3',
      color: 'blue',
      name: '100G',
      price: '50',
      desc: '100G流量加油包',
      title: '国内流量月包'
    }, {
      id: '4',
      color: 'blue',
      name: '300G',
      price: '100',
      desc: '300G流量加油包',
      title: '国内流量月包'
      // sale: '活动'
    }, {
      id: '5',
      color: 'blue',
      name: '500G',
      price: '200',
      desc: '500G流量加油包',
      title: '国内流量月包'
    }, {
      id: '6',
      color: 'red',
      name: '乐视定向流量',
      price: '30',
      desc: '乐视定向流量',
      title: '定向流量包'
    }, {
      id: '7',
      color: 'red',
      name: '优酷定向流量',
      price: '30',
      desc: '优酷定向流量',
      title: '定向流量包'
    }, {
      id: '8',
      color: 'red',
      name: '腾讯定向流量',
      price: '30',
      desc: '腾讯定向流量',
      title: '定向流量包'
    }, {
      id: '9',
      color: 'red',
      name: '爱奇艺定向流量',
      price: '30',
      desc: '爱奇艺定向流量',
      title: '定向流量包'
    }, {
      id: '10',
      color: 'green',
      name: '携程礼品包',
      price: '5',
      desc: '携程礼品包',
      title: '校园定向流量包'
    }, {
      id: '11',
      color: 'green',
      name: '大布阅读特权包',
      price: '15',
      desc: '大布阅读特权包',
      title: '校园定向流量包'
    }, {
      id: '12',
      color: 'green',
      name: '酷音铃声特权包',
      price: '30',
      desc: '酷音铃声特权包',
      title: '校园定向流量包'
    }, {
      id: '13',
      color: 'green',
      name: '沃游戏特权包',
      price: '25',
      desc: '沃游戏特权包',
      title: '校园定向流量包'
    }
  ]
  let mockInfo = info.filter(obj => obj.id === para.id)[0]
  const data = {
    code: 1,
    data: mockInfo
  }
  return data
})

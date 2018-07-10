import Mock from 'mockjs'
let qs = require('qs')
Mock.mock(/\/historyBill/, (options) => {
  console.log('访问mock')
  let para = qs.parse(options.body)
  let res = {}
  if (para.month % 3 === 0) {
    res = {
      'code': 1,
      'data': {
        'history_top': {
          'total_consumption': 88.3,
          'fixed_consumption': 85.00,
          'added_consumption': 0.00,
          'inline_consumption': 3.30
        },
        'history_down': {
          'fixed_consumption': 85.00,
          'package_consumption': 75.00,
          'overlay_package': 10.00,
          'added_consumption': 0.00,
          'added_email': 0.00,
          'inline_consumption': 0.00,
          'mobile_consumption': 3.30,
          'total_consumption': 88.3,
          'deposit_discount': 28.30,
          'aggregated_invitation': 67.37
        }
      }
    }
  } else if (para.month % 3 === 1) {
    res = {
      'code': 1,
      'data': {
        'history_top': {
          'total_consumption': 98.60,
          'fixed_consumption': 91.00,
          'added_consumption': 0.00,
          'inline_consumption': 7.60
        },
        'history_down': {
          'fixed_consumption': 91.00,
          'package_consumption': 83.00,
          'overlay_package': 8.00,
          'added_consumption': 0.00,
          'added_email': 0.00,
          'inline_consumption': 0.00,
          'mobile_consumption': 7.60,
          'total_consumption': 98.60,
          'deposit_discount': 28.30,
          'aggregated_invitation': 67.37
        }
      }
    }
  } else {
    res = {
      'code': 1,
      'data': {
        'history_top': {
          'total_consumption': 77.30,
          'fixed_consumption': 63.00,
          'added_consumption': 0.00,
          'inline_consumption': 14.30
        },
        'history_down': {
          'fixed_consumption': 63.00,
          'package_consumption': 55.00,
          'overlay_package': 8.00,
          'added_consumption': 0.00,
          'added_email': 0.00,
          'inline_consumption': 0.00,
          'mobile_consumption': 14.30,
          'total_consumption': 88.3,
          'deposit_discount': 28.30,
          'aggregated_invitation': 67.37
        }
      }
    }
  }
  console.log(res)
  return res
})

// 流量详情
Mock.mock(/\/flowDetail/, (options) => {
  let para = qs.parse(options.body)
  console.log('para', para.id)
  let res = {}
  if (para.id === '1') {
    if (para.month % 3 === 0) {
      res = {
        'code': 1,
        'data': {
          'flow_month': para.month + '月',
          'survey': {
            'all_value': 1.58,
            'all_money': 20
          },
          dateGroup: {
            'flow_date': para.month + '月1日',
            list: [
              {
                'flow_title': '套餐内流量',
                'cost': 2,
                'all_flow': 2226.36,
                'time': '0' + para.month + '/01 00:23:27'
              }, {
                'flow_title': '套餐内流量',
                'cost': 1,
                'all_flow': 998.36,
                'time': '0' + para.month + '/01 01:23:27'
              }, {
                'flow_title': '套餐内流量',
                'cost': 6,
                'all_flow': 8866.36,
                'time': '0' + para.month + '/01 02:23:27'
              }
            ]
          }
        }
      }
    } else if (para.month % 3 === 1) {
      res = {
        'code': 1,
        'data': {
          'flow_month': para.month + '月',
          'survey': {
            'all_value': 5.29,
            'all_money': 83
          },
          dateGroup: {
            'flow_date': para.month + '月2日',
            list: [
              {
                'flow_title': '套餐内流量',
                'cost': 2,
                'all_flow': 3006.36,
                'time': '0' + para.month + '/02 03:23:27'
              }, {
                'flow_title': '套餐内流量',
                'cost': 3,
                'all_flow': 3447.36,
                'time': '0' + para.month + '/02 04:23:27'
              }, {
                'flow_title': '免费流量',
                'cost': 0,
                'all_flow': 2887.36,
                'time': '0' + para.month + '/02 05:23:27'
              }
            ]
          }
        }
      }
    } else {
      res = {
        'code': 1,
        'data': {
          'flow_month': para.month + '月',
          'survey': {
            'all_value': 16.7,
            'all_money': 172
          },
          dateGroup: {
            'flow_date': para.month + '月3日',
            list: [
              {
                'flow_title': '套餐内流量',
                'cost': 5,
                'all_flow': 6666.36,
                'time': '0' + para.month + '/03 06:23:27'
              }, {
                'flow_title': '套餐内流量',
                'cost': 7,
                'all_flow': 8777.36,
                'time': '0' + para.month + '/03 07:23:27'
              }, {
                'flow_title': '套餐内流量',
                'cost': 1,
                'all_flow': 998.36,
                'time': '0' + para.month + '/03 08:23:27'
              }
            ]
          }
        }
      }
    }
  } else {
    let flowMonth = para.month + '月' + para.date + '日'
    if (para.date % 3 === 0) {
      res = {
        'code': 1,
        'data': {
          'flow_month': flowMonth,
          'survey': {
            'all_value': 0.67,
            'all_money': 13
          },
          'dateGroup': {
            'flow_date': flowMonth,
            list: [
              {
                'flow_title': '套餐内流量',
                'cost': 0.3,
                'all_flow': 301.36,
                'time': '0' + para.month + '/' + '0' + para.date + '00:23:27'
              }, {
                'flow_title': '免费流量',
                'cost': 0,
                'all_flow': 36.36,
                'time': '0' + para.month + '/' + '0' + para.date + '01:23:27'
              }, {
                'flow_title': '套餐内流量',
                'cost': 0.1,
                'all_flow': 77.36,
                'time': '0' + para.month + '/' + '0' + para.date + '02:23:27'
              }
            ]
          }
        }
      }
    } else if (para.date % 3 === 1) {
      res = {
        'code': 1,
        'data': {
          'flow_month': flowMonth,
          'survey': {
            'all_value': 1.33,
            'all_money': 29
          },
          'dateGroup': {
            'flow_date': flowMonth,
            list: [
              {
                'flow_title': '套餐内流量',
                'cost': 0.5,
                'all_flow': 601.36,
                'time': '0' + para.month + '/' + '0' + para.date + '03:23:27'
              }, {
                'flow_title': '免费流量',
                'cost': 0,
                'all_flow': 3447.36,
                'time': '0' + para.month + '/' + '0' + para.date + '04:23:27'
              }, {
                'flow_title': '免费流量',
                'cost': 0,
                'all_flow': 2887.36,
                'time': '0' + para.month + '/' + '0' + para.date + '05:23:27'
              }
            ]
          }
        }
      }
    } else {
      res = {
        'code': 1,
        'data': {
          'flow_month': flowMonth,
          'survey': {
            'all_value': 0.77,
            'all_money': 9
          },
          'dateGroup': {
            'flow_date': flowMonth,
            list: [
              {
                'flow_title': '套餐内流量',
                'cost': 0.1,
                'all_flow': 66.36,
                'time': '0' + para.month + '/' + '0' + para.date + '06:23:27'
              }, {
                'flow_title': '免费流量',
                'cost': 0,
                'all_flow': 3447.36,
                'time': '0' + para.month + '/' + '0' + para.date + '04:23:27'
              }, {
                'flow_title': '免费流量',
                'cost': 0,
                'all_flow': 36.36,
                'time': '0' + para.month + '/' + '0' + para.date + '01:23:27'
              }
            ]
          }
        }
      }
    }
  }
  console.log(res)
  return res
})


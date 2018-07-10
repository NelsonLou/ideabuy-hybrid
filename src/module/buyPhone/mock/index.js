import Mock from 'mockjs'
import qs from 'qs'
import img1 from '@/module/buyPhone/assets/img/phone1@2x.png'
import img2 from '@/module/buyPhone/assets/img/phone2@2x.png'
import img3 from '@/module/buyPhone/assets/img/middlephone@2x.png'

const goodslist = Mock.mock(/\/goodslist/, () => {
  let res = {}
  res = {
    'code': 1,
    'data': {
      'list': [
         {
           id: 1,
           name: '金立F109 3GB+16GB版 移动联通电信4G手机 双卡双待',
           img: img1,
           price: '1199',
           special: '0首付 12期免息',
           type: '金立',
           sellnum: '1000',
           tips: [
            {
              name: '赠'
            }
           ]
         }, {
           id: 2,
           name: '荣耀9 手机 魅海蓝 全网通4G (4G RAM+64G ROM)',
           img: img2,
           price: '2229',
           special: '0首付 12期免息',
           type: '华为',
           sellnum: '3599',
           tips: [
             {
               name: '赠'
             }
           ]
         }, {
           id: 3,
           name: '苹果(Apple) iPhone7 4G手机 中国红 (128G)',
           img: img3,
           price: '6799',
           special: '',
           type: 'iPhone',
           sellnum: '8000',
           tips: [
             {
               name: '赠'
             }
           ]
         }
      ],
      'type': [
        {
          name: '全部'
        },
        {
          name: 'iPhone'
        },
        {
          name: '华为'
        },
        {
          name: '小米'
        },
        {
          name: 'HTC'
        },
        {
          name: '金立'
        }
      ]
    }
  }
  return res
})

const goodDetail = Mock.mock(/\/goodDetail/, (params) => {
  let {id} = qs.parse(params.body)
  let res = {}
  let data = Mock.mock({
    'detail': [
       {
          id: 1,
          name: '金立F109 3GB+16GB版 移动联通电信4G手机 双卡双待',
          subtitle: '金立，手机中的站斗机',
          img: img1,
          price: '1199',
          special: '0首付 12期免息',
          type: '金立',
          sellnum: '1000',
          params: {
            color: [{
              type: '颜色',
              cont: [
                {
                  name: '樱花金'
                }, {
                  name: '暗夜黑'
                }
              ]
            }],
            neicun: [{
              type: '内存',
              cont: [
                {
                   name: '16GB'
                }, {
                   name: '32GB'
                }
              ]
            }]
          },
          detail: [
            {
              name: '是否支持4G',
              con: '是'
            },
            {
              name: '单卡/双卡',
              con: '双卡'
            },
            {
              name: 'CPU型号',
              con: '联发科 四核'
            },
            {
              name: 'SIM卡类型',
              con: 'nano卡'
            },
            {
              name: '分辨率',
              con: '1920X1080像素分辨率， 294ppi'
            },
            {
              name: '屏幕尺寸',
              con: '143毫米*70毫米*7.9毫米'
            },
            {
              name: '机身内存',
              con: '16GB'
            }
          ]
       }, {
            id: 2,
            name: '荣耀9 手机 魅海蓝 全网通4G (4G RAM+64G ROM)',
            subtitle: '',
            img: img2,
            price: '2229',
            special: '0首付 12期免息',
            type: '华为',
            sellnum: '800',
            params: {
            color: [{
              type: '颜色',
              cont: [
                {
                  name: '魅海蓝'
                }, {
                  name: '幻夜黑'
                }, {
                  name: '琥珀金'
                }, {
                  name: '海鸥灰'
                }
              ]
            }],
            neicun: [{
              type: '内存',
              cont: [
                {
                   name: '64GB'
                }, {
                   name: '128GB'
                }
              ]
            }]
          },
          detail: [
            {
              name: '是否支持4G',
              con: '是'
            },
            {
              name: '单卡/双卡',
              con: '双卡'
            },
            {
              name: 'CPU型号',
              con: '联发科 四核'
            },
            {
              name: 'SIM卡类型',
              con: 'nano卡'
            },
            {
              name: '分辨率',
              con: '5120X3840像素分辨率， 428ppi'
            },
            {
              name: '屏幕尺寸',
              con: '147毫米*70.9毫米*7.45毫米'
            },
            {
              name: '机身内存',
              con: '128GB'
            }
          ]
       }, {
            id: 3,
            name: '苹果(Apple) iPhone7 4G手机 中国红 (128G)',
            subtitle: '原装全新未激活！ 苹果约起来吧！ 12期免息',
            img: img3,
            price: '6799',
            special: '',
            type: 'iPhone',
            params: {
            banben: [{
              type: '规格',
              cont: [
                {
                  name: 'iPhone7'
                }, {
                  name: 'iPhone7 P'
                }
              ]
            }],
            color: [{
              type: '颜色',
              cont: [
                {
                  name: '玫瑰金'
                }, {
                  name: '中国红'
                }
              ]
            }],
            neicun: [{
              type: '内存',
              cont: [
                {
                   name: '32GB'
                }, {
                   name: '64GB'
                }
              ]
            }]
          },
          detail: [
            {
              name: '是否支持4G',
              con: '是'
            },
            {
              name: '单卡/双卡',
              con: '双卡'
            },
            {
              name: 'CPU型号',
              con: '联发科 四核'
            },
            {
              name: 'SIM卡类型',
              con: 'nano卡'
            },
            {
              name: '分辨率',
              con: '1920X1080像素分辨率， 294ppi'
            },
            {
              name: '屏幕尺寸',
              con: '143毫米*70毫米*7.9毫米'
            },
            {
              name: '机身内存',
              con: '32GB'
            }
          ]
          }
      ]
  })
  let Detail = data.detail
  let newDetail = Detail.filter(d => {
    if (d.id.toString().indexOf(id) === -1) {
      return false
    }
    return d
  })
  res = {
    'code': 1,
    'data': newDetail
  }
  return res
})

const contract = Mock.mock(/\/getContract/, () => {
  let res = {}
  res = {
    'code': 1,
    'data': {
      'list': [
        {
          'id': 1,
          'name': '56',
          'cont': {
            'con1': [
              {
                'name': '国内语音',
                'desc': '500分钟'
              },
              {
                'name': '国内流量',
                'desc': '2GB'
              }
            ],
            'con2': {
              'deal': [
                {
                  'time': '12',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '60'
                    }
                  ]
                }, {
                  'time': '24',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '79'
                    }
                  ]
                }, {
                  'time': '36',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '99'
                    }
                  ]
                }, {
                  'time': '40',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '109'
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          'id': 2,
          'name': '96',
          'cont': {
            'con1': [
              {
                'name': '国内语音',
                'desc': '800分钟'
              },
              {
                'name': '国内流量',
                'desc': '2GB'
              }
            ],
            'con2': {
              'deal': [
                {
                  'time': '12',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '6333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '60'
                    }
                  ]
                }, {
                  'time': '24',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '79'
                    }
                  ]
                }, {
                  'time': '36',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '99'
                    }
                  ]
                }, {
                  'time': '40',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '109'
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          'id': 3,
          'name': '126',
          'cont': {
            'con1': [
              {
                'name': '国内语音',
                'desc': '1000分钟'
              },
              {
                'name': '国内流量',
                'desc': '2GB'
              }
            ],
            'con2': {
              'deal': [
                {
                  'time': '12',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '60'
                    }
                  ]
                }, {
                  'time': '24',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '79'
                    }
                  ]
                }, {
                  'time': '36',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '99'
                    }
                  ]
                }, {
                  'time': '40',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '109'
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          'id': 4,
          'name': '156',
          'cont': {
            'con1': [
              {
                'name': '国内语音',
                'desc': '1500分钟'
              },
              {
                'name': '国内流量',
                'desc': '2GB'
              }
            ],
            'con2': {
              'deal': [
                {
                  'time': '12',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '60'
                    }
                  ]
                }, {
                  'time': '24',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '79'
                    }
                  ]
                }, {
                  'time': '36',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '99'
                    }
                  ]
                }, {
                  'time': '40',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '109'
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          'id': 5,
          'name': '200',
          'cont': {
            'con1': [
              {
                'name': '国内语音',
                'desc': '2000分钟'
              },
              {
                'name': '国内流量',
                'desc': '10GB'
              }
            ],
            'con2': {
              'deal': [
                {
                  'time': '12',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '60'
                    }
                  ]
                }, {
                  'time': '24',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '79'
                    }
                  ]
                }, {
                  'time': '36',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '99'
                    }
                  ]
                }, {
                  'time': '40',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '109'
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          'id': 6,
          'name': '256',
          'cont': {
            'con1': [
              {
                'name': '国内语音',
                'desc': '2500分钟'
              },
              {
                'name': '国内流量',
                'desc': '20GB'
              }
            ],
            'con2': {
              'deal': [
                {
                  'time': '12',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '60'
                    }
                  ]
                }, {
                  'time': '24',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '79'
                    }
                  ]
                }, {
                  'time': '36',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '99'
                    }
                  ]
                }, {
                  'time': '40',
                  'other': [
                    {
                      'name': '合约机总价',
                      'desc': '5333'
                    },
                    {
                      'name': '返款总金额',
                      'desc': '1910'
                    },
                    {
                      'name': '每月返还金额',
                      'desc': '109'
                    }
                  ]
                }
              ]
            }
          }
        }
      ]
    }
  }
  return res
})

const number = Mock.mock(/\/getNumberList/, () => {
  let res = {}
  res = {
    'code': 1,
    'data': {
      'number': [
        {
          'id': '1',
          'number': '13116625813',
          'fee': '0',
          'price': '1000'
        },
        {
          'id': '2',
          'number': '18767123805',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '3',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '4',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '5',
          'number': '1234567901',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '6',
          'number': '13116625813',
          'fee': '0',
          'price': '10'
        },
        {
          'id': '7',
          'number': '13248500388',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '8',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '1',
          'number': '13221967965',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '1',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '1',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '1',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '1',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        },
        {
          'id': '1',
          'number': '13116625813',
          'fee': '0',
          'price': '100'
        }
      ]
    }
  }
  return res
})

export default {goodslist, goodDetail, contract, number}

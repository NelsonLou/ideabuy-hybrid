import Mock from 'mockjs'
import qs from 'qs'
import meal1 from '../../../assets/img/meal1.png'
import meal2 from '../../../assets/img/meal2.png'
import meal3 from '../../../assets/img/meal3.png'
import meal4 from '../../../assets/img/meal4.png'

// 套餐列表页
const mealList = Mock.mock(/\/requestPackge/, () => {
    let res = {}
    res = {
        'code': 1,
        'data': [
            {
                'package_id': 0,
                'packge_img': meal1,
                'package_name': '【两年以上老用户专享】4G全国套餐老用户预存送费/业务',
                'package_price': 30,
                'packge_give': 1,
                'type': 'whole'
            }, {
                'package_id': 1,
                'packge_img': meal2,
                'package_name': '【12个月以下老用户专享】4G全国套餐老用户预存送费/业务',
                'package_price': 139,
                'packge_give': 0,
                'type': 'whole'
            }, {
                'package_id': 2,
                'packge_img': meal3,
                'package_name': '流量日租卡(1存50得100)100元话费将于手机卡激活次日到账',
                'package_price': 50,
                'packge_give': 1,
                'type': 'one'
            }, {
                'package_id': 3,
                'packge_img': meal4,
                'package_name': '【新品上市】畅视50元卡 新品上市,限时0元体验',
                'package_price': 39,
                'packge_give': 0,
                'type': 'new'
            }
        ]
    }
    // console.log(res)
    return res
})

// 套餐详情页
const mealDetail = Mock.mock(/\/requestDetail/, (options) => {
    let para = qs.parse(options.body)
    let res = {}
    if (para.id % 3 === 0) {
        res = {
            'code': 1,
            'data': {
                'package_top': {
                    'package_img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503570597756&di=0251718a6a9f18c3bab652f09ba74fe4&imgtype=0&src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1305%2F23%2F3310093_1_130502232533_1.jpg',
                    'package_info': '200元话费/6G流量',
                    'package_name': '流量日租卡(1存50得100)100元话费将于手机卡激活次日到账',
                    'package_price': 50,
                    'package_choose': 123,
                    'phone_number': 15286877777,
                    'package_preferential': ['得480元话费', '送12G流量'],
                    'package_ruler': '从合约生效起每月返还40元话费,持续12月'
                }
            }
        }
    } else if (para.id % 3 === 1) {
        res = {
            'code': 1,
            'data': {
                'package_top': {
                    'package_img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503571938363&di=1e81f0a68d947759c497ba09f60c748e&imgtype=0&src=http%3A%2F%2Fi.hj.cn%2Fxywb%2F20170113%2FXYWB201701135_3.jpg',
                    'package_info': '480元话费/12G流量(二大好礼 任选其一)',
                    'package_name': '【两年以上老用户专享】4G全国套餐老用户预存送费/业务',
                    'package_price': 50,
                    'package_choose': 269,
                    'phone_number': 15286888888,
                    'package_preferential': ['得480元话费', '送12G流量'],
                    'package_ruler': '从合约生效起每月返还40元话费,持续12月'
                }
            }
        }
    } else {
        res = {
            'code': 1,
            'data': {
                'package_top': {
                    'package_img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503571967249&di=76f7d0a6255e2cef1a8d27e9f60fe9b5&imgtype=0&src=http%3A%2F%2Fimg10.360buyimg.com%2Fn0%2Fjfs%2Ft1837%2F345%2F2311875634%2F332747%2F40be0dfa%2F56d3d1c7N4cd6987f.jpg',
                    'package_info': '480元话费/12G流量(二大好礼 任选其一)',
                    'package_name': '【新品上市】畅视50元卡 新品上市,限时0元体验',
                    'package_price': 50,
                    'package_choose': 210,
                    'phone_number': 15286866666,
                    'package_preferential': ['得480元话费', '送12G流量'],
                    'package_ruler': '从合约生效起每月返还40元话费,持续12月'
                }
            }
        }
    }
    // console.log(res)
    return res
})

// 选择套餐
const mealChange = Mock.mock(/\/requestNico/, (options) => {
    let para = qs.parse(options.body)
    let res = {}
    if (para.id % 3 === 0) {
        res = {
            'code': 1,
            'data': {
                'package_type': [76, 106, 136],
                'package_detail': [
                    {
                        'packge_choose': 76,
                        'packge_contain': '4GB流量,1000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }, {
                        'packge_choose': 106,
                        'packge_contain': '4GB流量,2000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }, {
                        'packge_choose': 136,
                        'packge_contain': '4GB流量,3000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }
                ]
            }
        }
    } else if (para.id % 3 === 1) {
        res = {
            'code': 1,
            'data': {
                'package_type': [126, 156, 186],
                'package_detail': [
                    {
                        'packge_choose': 126,
                        'packge_contain': '4GB流量,1000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }, {
                        'packge_choose': 156,
                        'packge_contain': '4GB流量,2000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }, {
                        'packge_choose': 186,
                        'packge_contain': '4GB流量,3000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }
                ]
            }
        }
    } else {
        res = {
            'code': 1,
            'data': {
                'package_type': [236, 336, 536],
                'package_detail': [
                    {
                        'packge_choose': 236,
                        'packge_contain': '4GB流量,1000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }, {
                        'packge_choose': 336,
                        'packge_contain': '4GB流量,2000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }, {
                        'packge_choose': 536,
                        'packge_contain': '4GB流量,3000分钟语音通话',
                        'packge_other': ['国内(含可视电话)接听免费', '国内流量0.27元/MB', '国内语音0.15元/分钟', '短/彩信0.10/条', '其他业务']
                    }
                ]
            }
        }
    }
    return res
})

// 套餐详情图文/评论
const comment = Mock.mock(/\/requestDown/, (options) => {
    let para = qs.parse(options.body)
    let res = {}
    if (para.id === 0) {
        res = {
            'code': 1,
            'data': {
                'package_down': [
                    {
                        'detail_img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504169632&di=f63080edefecd8b35c876808a26c0c21&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170808%2F-fgu-fyitapp2915567.jpg'
                    },
                    {
                        'detail_img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503570597756&di=0251718a6a9f18c3bab652f09ba74fe4&imgtype=0&src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1305%2F23%2F3310093_1_130502232533_1.jpg'
                    },
                    {
                        'detail_img': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504169632&di=f63080edefecd8b35c876808a26c0c21&imgtype=jpg&er=1&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2F20170808%2F-fgu-fyitapp2915567.jpg'
                    }
                ]
            }
        }
    } else {
        res = {
            'code': 1,
            'data': {
                'package_down': {
                    'user_value': [10, 5, 10, 3],
                    'evaluate_value': ['80%', '50%', '30%'],
                    'user_evaluate': [
                        {
                            'user_img': 'http://balabala',
                            'user_name': 15276951236,
                            'user_pint': 750,
                            'evaluate_star': 5,
                            'buy_packge': '4G全国76元套餐',
                            'buy_time': '2017/08/22',
                            'user_meg': '用了几百年了,越来越扣？',
                            'user_message': [
                                {
                                    'user_img': '',
                                    'user_name': '中国联通官方客服',
                                    'message': '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
                                    'date': '2017/08/23'
                                }
                            ]
                        }, {
                            'user_img': 'http://lululululu',
                            'user_name': 13276541536,
                            'user_pint': 390,
                            'evaluate_star': 3,
                            'buy_packge': '4G省内390元套餐',
                            'buy_time': '2017/08/21',
                            'user_meg': '用了几百年了,越来越扣？',
                            'user_message': [
                                {
                                    'user_img': '',
                                    'user_name': '中国联通官方客服',
                                    'message': '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
                                    'date': '2017/08/23'
                                }
                            ]
                        }, {
                            'user_img': 'http://xixixixixi',
                            'user_name': 16637685975,
                            'user_pint': 888,
                            'evaluate_star': 5,
                            'buy_packge': '4G全球通888元套餐',
                            'buy_time': '2017/08/23',
                            'user_meg': '用了几百年了,越来越扣？',
                            'user_message': [
                                {
                                    'user_img': '',
                                    'user_name': '中国联通官方客服',
                                    'message': '您好，经查询您已成功办理老用户存费送业务合约，新合约会根据元合约情况自动生效。',
                                    'date': '2017/08/23'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
    // console.log(res)
    return res
})

export default {
    mealList,
    mealDetail,
    mealChange,
    comment
}

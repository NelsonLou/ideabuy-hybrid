// import Mock from 'mockjs'
// let qs = require('qs')
// Mock.mock('http://i.dev.weknet.cn/api/historyBill', (options) => {
//   let para = qs.parse(options.body)
//   let res = {}
//   if (para.month % 3 === 0) {
//     res = {
//       'code': 1,
//       'data': {
//         'history_top': {
//           'total_consumption': 88.3,
//           'fixed_consumption': 85.00,
//           'added_consumption': 0.00,
//           'inline_consumption': 3.30
//         },
//         'history_down': {
//           'fixed_consumption': 85.00,
//           'package_consumption': 75.00,
//           'overlay_package': 10.00,
//           'added_consumption': 0.00,
//           'added_email': 0.00,
//           'inline_consumption': 0.00,
//           'mobile_consumption': 3.30,
//           'total_consumption': 88.3,
//           'deposit_discount': 28.30,
//           'aggregated_invitation': 67.37
//         }
//       }
//     }
//   } else if (para.month % 3 === 1) {
//     res = {
//       'code': 1,
//       'data': {
//         'history_top': {
//           'total_consumption': 98.60,
//           'fixed_consumption': 91.00,
//           'added_consumption': 0.00,
//           'inline_consumption': 7.60
//         },
//         'history_down': {
//           'fixed_consumption': 91.00,
//           'package_consumption': 83.00,
//           'overlay_package': 8.00,
//           'added_consumption': 0.00,
//           'added_email': 0.00,
//           'inline_consumption': 0.00,
//           'mobile_consumption': 7.60,
//           'total_consumption': 98.60,
//           'deposit_discount': 28.30,
//           'aggregated_invitation': 67.37
//         }
//       }
//     }
//   } else {
//     res = {
//       'code': 1,
//       'data': {
//         'history_top': {
//           'total_consumption': 77.30,
//           'fixed_consumption': 63.00,
//           'added_consumption': 0.00,
//           'inline_consumption': 14.30
//         },
//         'history_down': {
//           'fixed_consumption': 63.00,
//           'package_consumption': 55.00,
//           'overlay_package': 8.00,
//           'added_consumption': 0.00,

//           'added_email': 0.00,
//           'inline_consumption': 0.00,
//           'mobile_consumption': 14.30,
//           'total_consumption': 88.3,
//           'deposit_discount': 28.30,
//           'aggregated_invitation': 67.37
//         }
//       }
//     }
//   }
//   console.log(res)
//   return res
// })
// Mock.setup({
//   timeout: 100000
// })
//
// export default Mock

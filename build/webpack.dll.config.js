const webpack = require('webpack');
var path = require('path')
var fs = require("fs")

let myentrys = []
var root = path.join(__dirname, '..')
//异步获取文件
// readDir(path.join(root))
// function readDir(path1) {
//   fs.readdir(path1, function (err, menu) {
//     if (!menu)
//       return;
//     menu.forEach(function (ele) {
//       fs.stat(path1 + "/" + ele, function (err, info) {
//         if (info.isDirectory()) {
//           readDir(path1 + "/" + ele);
//         } else {
//           let a = path1 + "/" + ele
//           // console.log(path.join(__dirname, '../', 'node_modules'))
//           // console.log(a)
//           if (/\.js$/.test(a) && a.indexOf(path.join(__dirname, '..')+'/node_modules') === 0) {
//             myentrys.push(a)
//             console.log(a)
//           }
//         }
//       })
//     })
//   })
// }
let arr = [path.join(root,'./node_modules/core-js/library')]
arr.forEach(function (path1) {
  redDir(path1)
})
function redDir(path1) {
  let files = fs.readdirSync(path1)
  if (!files) {
    return
  }
  files.forEach(function (ele) {
    let stat = fs.statSync(path1 + "/" + ele)
    if (stat.isDirectory()) {
      redDir(path1 + "/" + ele)
    } else {
      let a = path1 + "/" + ele
      if(/\.js$/.test(a)){
        myentrys.push(a.replace('F:\\testspace\\webpack-test','.').replace(/\\/g,'/'))
        console.log(a.replace('F:\\testspace\\webpack-test','.').replace(/\\/g,'/'))
      }
    }
  })
}
console.log(myentrys)
let entrys = [
  'vue-router',
  'qs',
  'axios',
  'core-js',
  'vuex',
  'object-assign',
  'css-loader/lib/css-base.js',
  'vue-style-loader/lib/addStylesClient.js',
  'vue-style-loader/lib/listToStyles.js',
  'array-filter',
  'array-find',
  'array-map',
  'vue-axios',
  'vue-loader/lib/component-normalizer.js',
  'vue/dist/vue.esm.js',
  './src/assets/js/address.js',
  'vue-infinite-scroll',
  'mockjs',
]
module.exports = {
  entry: {
    bundle: myentrys.concat(entrys),
    // bundle: entrys
  },
  output: {
    path: __dirname,
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      // path: './build/bundle.manifest.json',
      path: path.resolve(__dirname, './bundle.manifest.json'),
      name: '[name]_library',
      context: path.resolve(__dirname, '..')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
      // sourceMap: true
    })
  ]
};

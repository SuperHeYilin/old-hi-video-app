const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd').replace(/warn\.js$/, ''), // antd 内置svg，
  // 业务代码本地私有 svg 存放目录path.resolve(__dirname, 'src/my-project-svg-foler'),
  path.resolve(__dirname, 'src/public/svg')
];
export default {
  entry : "src/index.js" ,
  hash: true,
  outputPath:"./dist",
  multipage:true,
  disableCSSModules : false ,
  cssModulesExclude: [
    './src/index.css',
  ],
  //publicPath : "/" ,
  svgSpriteLoaderDirs: svgSpriteDirs,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  proxy : { } ,
  extraPostCSSPlugins : [
  ] ,
  extraBabelPlugins : [
    "transform-runtime" ,
    ["import", {"libraryName": "antd", "style": true}],
  ] ,
  env : {
    development : {
      extraBabelPlugins : [
        "dva-hmr",
      ]
    }
  }
};

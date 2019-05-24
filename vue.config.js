const url='http://api.zhuishushenqi.com/cats/lv2/statistics'
//http://novel.juhe.im/search?keyword=遮天

module.exports = {
  configureWebpack:{
    devServer:{
      proxy:{
        '/api':{
          target:'http://api.zhuishushenqi.com',
          pathRewrite:{"^/api" : ""}
        },
         '/novel':{
          target:'http://novel.juhe.im',
          pathRewrite:{"^/novel" : ""}
        },
        '/chapter2':{
          target:'http://chapter2.zhuishushenqi.com',
          pathRewrite:{"^/chapter2" : ""}
        }
      }
    }
  }
}

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/ying": {
        target: "http://10.68.131.139:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/ying": ""
        }
      },
      "/heng": {
        target: "http://10.68.130.126:8088",
        changeOrigin: true,
        pathRewrite: {
          "^/heng": ""
        }
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};

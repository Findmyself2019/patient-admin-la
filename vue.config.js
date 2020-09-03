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
        target: "http://10.68.130.126:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/heng": ""
        }
      }
    }
  }
};

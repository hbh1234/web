module.exports = {
  // publicPath:
  //   process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: process.env.API_SERVER,
        ws: true,
        changeOrigin: true,
        xfwd: true,
        followRedirects: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

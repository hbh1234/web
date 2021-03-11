module.exports = {
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

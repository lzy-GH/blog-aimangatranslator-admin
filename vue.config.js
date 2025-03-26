module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: "./",
  devServer: {
    port: 5004,
    proxy: {
      "/api": {
        target: "http://192.168.1.123:8000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

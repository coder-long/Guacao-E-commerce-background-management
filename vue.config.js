module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://118.24.25.7:5000',
        // 允许跨域
        changeOrigin: true
      }
    }
  }
}

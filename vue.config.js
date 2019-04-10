
module.exports = {

    baseUrl: "/",
  
    outputDir: 'dist',
  
    assetsDir: 'assets',
  
    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      open: true,
  
      host: '127.0.0.1',
  
      port: 8082,
  
      https: false,
  
      hotOnly: false,
  
      proxy: {
        '^/api':{
          target: 'http://localhost:8180',
          changeOrigin: true,
          pathRewrite: {
            '^/api':'/'
          }
        },
        '^/jj':{
          target: 'http://localhost:8080',
          changeOrigin: true,
        }
      },
  
      before: app => {
      }
    }
};
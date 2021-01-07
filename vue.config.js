module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                // 起别名
                'assets':'@/assets',
                'components':'@/components',
                'common':'@/common',
                'store':'@/store',
                'views':'@/views',
                'network':'@/network',
            }
        }
    }
}
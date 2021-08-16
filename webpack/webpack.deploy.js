const { merge } = require('webpack-merge')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const commonWebpackConfig = require('./webpack.common.js')
const prodWebpackConfig = require('./webpack.prod.js')

const deployWebpackConfig = {
    plugins: [
        new SentryWebpackPlugin({
            include: [commonWebpackConfig.externals.paths.dist, '.'],
            ignoreFile: '../sentrycliignore',
            release: '1.0.0',
            urlPrefix: '~/js/mypage/'
        })
    ]
}

module.exports = merge(prodWebpackConfig, deployWebpackConfig)

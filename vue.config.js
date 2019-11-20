module.exports = {
	assetsDir: 'assets',
	chainWebpack: config => {
		if (config.plugins.has('extract-css')) {
			const extractCSSPlugin = config.plugin('extract-css')
			extractCSSPlugin && extractCSSPlugin.tap(() => [{
				filename: 'assets/[name].[hash:8].css',
				chunkFilename: 'assets/[name].[hash:8].css'
			}])
		}
	},
	configureWebpack: {
		output: {
			filename: 'assets/[name].[hash:8].js',
			chunkFilename: 'assets/[name].[hash:8].js'
		}
	}
}

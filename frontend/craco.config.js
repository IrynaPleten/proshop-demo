const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
	webpack: {
		alias: {
			'@assets': resolvePath('./src/assets'),
			'@components': resolvePath('./src/components'),
			'@screens': resolvePath('./src/screens'),
			'@slices': resolvePath('./src/slices'),
			'@utils': resolvePath('./src/utils'),
		},
	},
}

module.exports = {
	entry: {
		settings: { import: ['./assets/admin-settings.js', './assets/group.js' ], filename:  'assets/admin-settings.min.js' }
	},
	output: {
		path: __dirname,
	},
	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};

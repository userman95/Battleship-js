const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
	},

	plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({
		title: "Battleship",
		favicon: './src/images/favicon.jpg',
		hash: true})],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			  },
			  {
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
				  loader: 'url-loader',
				  options: {
					limit: 8000,
					name: 'images/[hash]-[name].[ext]'
				  }
				}]
			  },
			{
			test: /\.(js)$/,
			exclude: /node_modules/,
			use: ["babel-loader"]
			}
			,
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = ({development}) => {
	const devmode = !!development
	return {
		target: "web",
		entry: {
			app: "./src/index.js"
		},
		output: {
			path: path.join(__dirname, "build"),
			filename: devmode
				? "js/[name].js"
				: "js/[name].[hash].js",
			publicPath: "/"
		},
		devServer: {
			allowedHosts: ["*"],
			hot: true,
			devMiddleware: {
				publicPath: "/"
			},
			historyApiFallback: true,
			static: {
				watch: true
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "public/index.ejs",
				filename: "index.html",
				inject: false
			}),
			new MiniCssExtractPlugin(
			{
				filename: devmode
					? "css/[name].css"
					: "css/[name].[hash].css",
				chunkFilename: devmode
					? "css/[id].css"
					: "css/[id].[hash].css",
				ignoreOrder: false
			}),
			new CleanWebpackPlugin()
		],
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				},
				{
					test: /\.(sc|sa|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader"
					]
				}
			]
		},
		resolve: {
			extensions: [
				".js",
				".jsx"
			],
			alias: {
				"@": path.join(__dirname, "src")
			}
		},
		devtool: devmode
			? "source-map"
			: false,
		mode: devmode
			? "development"
			: "production"
	}
}
//var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
//var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


//获取多页面的每个入口文件，用于配置中的entry
/*
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        //console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    //console.log(JSON.stringify(files));
    return files;
}
*/
module.exports = {
    debug: true,
    devtool: "source-map",
    entry: {
      boxDialog:'./src/js/component/boxDialog.js'/*,
      vendor : ['jquery']*/
    },
    /*entry: [
      'eventsource-polyfill',
      //boxDialog:'./src/js/component/boxDialog.js'/*,
      './src/js/component/boxDialog.js'/*,
      vendor : ['jquery']*/
    //],
    output: {
        //path: path.join(__dirname, "src/"),
        //publicPath: "src/",
        filename: "[name].js"
        //chunkFilename: "[chunkhash].js"
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
	          loaders: [
		            {test: /\.js$/, loader: "babel", query: {presets: ['react', 'es2015']}},	/*es6 to es5*/
		            {test: /\.jsx$/, loader: 'babel', query: {presets: ['react', 'es2015']}},	/*jsx to js,es5 to es6*/
		            {test: /\.css$/, loader: "style!css"},					                         	/*css to css*/
		            {test: /\.(jpg|png)$/, loader: "url?limit=8192"},			 	                  /*images 打包*/
		            {test: /\.scss$/, loader: "style!css!sass"}				 	                      /*sass to css*/
	          ]
    },
    plugins: [
      /*new webpack.ProvidePlugin({
        $: "jquery"
        //React: "react",
        //ReactDOM: "react-dom"
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // (the commons chunk name)

        filename: "jquery.min",
        // (the filename of the commons chunk)

        minChunks: 2,
        // (Modules must be shared between 3 entries)

        // chunks: ["pageA", "pageB"],
        // (Only use these entries)
      })/*,
      new uglifyJsPlugin({
          compress: {
              warnings: false
          }
      })*/
    ]
};

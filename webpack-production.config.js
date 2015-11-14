var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

// Config Here.
var CONF = {
    HOST: 3002,
    BASE: '/src/app/',
    STATIC: 'http://static.wesafari.cn',
    DIST: path.resolve(__dirname, 'build')
}

/**
 * resolve pages path
 */
function _p(page){
    return path.join(__dirname, CONF.BASE, 'pages/' + page + '/');
}

var config = {
    /**
     * Entry points to the project
     * doc: http://webpack.github.io/docs/configuration.html#entry
     *
     * If you pass an object: Multiple entry bundles are created.
     * The key is the chunk name. The value can be a string or an array.
     */
    entry: {
        agreement: _p('agreement'),
        about: _p('about'),
        sharing: _p('sharing'),
        //signup: _p('signup'),
    },

    /**
     * Output
     * doc: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
        path: CONF.DIST,            //Path of output file
        publicPath: CONF.STATIC,    //Path for public assets
        filename: '[name].js'
    },

    /**
     * Config options on how to interpret requires imports
     * doc: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.json', '.jsx', '.scss', '.css'],
        modulesDirectories: ["web_modules", "node_modules", 'bower_components'],
        alias: {
            WS: path.join(__dirname, CONF.BASE + 'components'),
            Img: path.join(__dirname, CONF.BASE + 'images')
        },
    },

    /**
     * Devtool
     * doc: http://webpack.github.io/docs/configuration.html#devtool
     */
    devtool: 'source-map',

    /**
     * Plugin
     * doc: http://webpack.github.io/docs/using-plugins.html
     * list: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
        //Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            //supresses warnings, usually from module minification
            warnings: false,
            drop_console: true
          }
        }),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        //Transfer Files
        new TransferWebpackPlugin([
          {from: 'www'}
        ], path.resolve(__dirname,"src"))
    ],

    /**
     * Bunch of Loaders
     * doc: http://webpack.github.io/docs/using-loaders.html
     * list: http://webpack.github.io/docs/list-of-loaders.html
     */
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files
                loaders: ['react-hot','babel-loader?stage=0'], //react-hot is like browser sync and babel loads jsx and es6-7
                exclude: [path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]   //"style!css!sass"
                //loaders: ["style", "css?sourceMap", "sass"]  // sourceMap effect rendering
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=20480&name=assets/[name]-[hash:8].[ext]' //< 20k, otherwise file-loader is used auto
            }
        ]
    },
    //eslint config options. Part of the eslint-loader package
    eslint: {
        configFile: '.eslintrc'
    },
};

/**
 * export Configuration to the CLI.
 * @return {Object}
 */
module.exports = config;

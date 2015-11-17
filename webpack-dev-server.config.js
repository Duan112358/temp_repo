var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


// Config Here.
var CONF = {
    HOST: 3002,
    BASE: '/src/',
    STATIC: '',
    DIST: path.resolve(__dirname, 'build'),
    TEMP: path.join(__dirname, '/src/', 'www/page.template.html'),
    LOADING: _toURI('./src/images/loading@2x.gif')
}

/**
 * get DataURI of Images.
 */
function _toURI(img){
    var imgBuffer = fs.readFileSync(img);
    return "data:image/gif;base64," + imgBuffer.toString("base64");
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
        vendor: ['react'],
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
     * Server Configuration options
     * doc: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer:{
        contentBase: '',    //Relative directory for base of server
        hot: true,          //Live-reload
        host: process.env.HOST || '0.0.0.0',
        inline: true,
        port: CONF.HOST,    //Port Number
        stats: {
            colors: true,
            cached: false,
            exclude: [/node_modules[\\\/]/]
        }
    },

    /**
     * Plugin
     * doc: http://webpack.github.io/docs/using-plugins.html
     * list: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
        //Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        // Split vendors
        new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.js"),
        //Moves HTML to base
        new TransferWebpackPlugin([
          {from: 'www'}
        ], path.resolve(__dirname, "src")),
        // Generate HTML
        new HtmlWebpackPlugin({
            title: '关于我们',
            filename: 'about.html',
            chunks: ['about', 'vendor'],
            template: CONF.TEMP,
            loadingURI: CONF.LOADING
        }),
        new HtmlWebpackPlugin({
            title: '用户协议',
            filename: 'agreement.html',
            chunks: ['agreement', 'vendor'],
            template: CONF.TEMP,
            loadingURI: CONF.LOADING
        }),
        new HtmlWebpackPlugin({
            title: 'TEST',
            filename: 'test.html',
            chunks: ['vendor'],
            template: CONF.TEMP,
            loadingURI: CONF.LOADING
        })
        // new HtmlWebpackPlugin({
        //     title: '邀请码注册',
        //     filename: 'signup.html',
        //     chunks: ['signup', 'vendor'],
        //     template: CONF.TEMP
        // })
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
                loaders: ["style", "css?modules&localIdentName=[hash:base64:5]", "sass"]   //"style!css!sass"
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

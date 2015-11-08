var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

// Config Here.
var CONF = {
    HOST: 3002,
    BASE: '/src/app/',
    DIST: path.resolve(__dirname, 'build')
}

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
        signup: _p('signup'),
        sharing: _p('sharing'),
    },

    /**
     * Output
     * doc: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
        path: CONF.DIST,    //Path of output file
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
     * Server Configuration options
     * doc: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer:{
        contentBase: '',    //Relative directory for base of server
        hot: true,          //Live-reload
        inline: true,
        port: CONF.HOST,    //Port Number
        stats: {
            colors: true,
            cached: false,
            exclude: [/node_modules[\\\/]/]
        }
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
        //Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        //Moves files
        new TransferWebpackPlugin([
          {from: 'www'}
        ], path.resolve(__dirname, "src"))
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
                loaders: ["style", "css?sourceMap", "sass"] //"style!css!sass"
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=20480' //< 20k, otherwise file-loader is used auto
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

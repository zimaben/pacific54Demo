/**
 * Webpack configuration.
 */
const path = require( 'path' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//const TerserPlugin = require("terser-webpack-plugin");
const cssnano = require('cssnano');
// JS Directory path.
const JS_DIR = path.resolve( __dirname, 'src/js' );
const BUILD_DIR = path.resolve( __dirname, 'dist' );
//CSS Directory path.
const CSS_DIR = path.resolve( __dirname, 'src/scss' );

var entry = {

    main: JS_DIR + '/head.js',
    footer: JS_DIR + '/foot.js',
    '/blocks/formlog': JS_DIR + '/formlog.js',
    '/blocks/printform': JS_DIR + '/printform.js',
    admin_css: CSS_DIR + '/editor.scss',
    style: CSS_DIR + '/style.scss',
};
// blockList.list.forEach(function(handle){
//    entry['/blocks/' + handle] = JS_DIR + '/blocks/' + handle + '.js';
// });
const output = {
    path: path.resolve(__dirname, BUILD_DIR),
    //path: BUILD_DIR,
    filename: 'js/[name].js'
};
/**
 * Note: argv.mode will return 'development' or 'production'.
 */
const plugins = ( argv ) => [
    new CleanWebpackPlugin( {
        cleanStaleWebpackAssets: ( argv.mode === 'development' ) // Automatically remove all unused webpack assets on rebuild, when set to true in production. ( https://www.npmjs.com/package/clean-webpack-plugin#options-and-defaults-optional )
    } ),
    new MiniCssExtractPlugin( { 

       filename: "[name].css",

    } ),
];
const rules = [
    {
        test: /\.js$/,
        include: [ JS_DIR ],
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.scss$/,
        exclude: [/node_modules/, /assets/],
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader','sass-loader',
        ]
    },
    // {
    //     test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: 'file-loader',
    //         options: {
    //             name: '[path][name].[ext]',
    //            // publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
    //         }
    //     }
    // },
    // {
    //    test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg|json)$/i,
    //    use: 'url-loader?limit=1024'

    //  }
];
/**
 * Since you may have to disambiguate in your webpack.config.js between development and production builds,
 * you can export a function from your webpack configuration instead of exporting an object
 *
 * @param {string} env environment ( See the environment options CLI documentation for syntax examples. https://webpack.js.org/api/cli/#environment-options )
 * @param argv options map ( This describes the options passed to webpack, with keys such as output-filename and optimize-minimize )
 * @return {{output: *, devtool: string, entry: *, optimization: {minimizer: [*, *]}, plugins: *, module: {rules: *}, externals: {jquery: string}}}
 *
 * @see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
module.exports = ( env, argv ) => ({
    entry: entry,
    output: output,
    /**
     * A full SourceMap is emitted as a separate file ( e.g.  main.js.map )
     * It adds a reference comment to the bundle so development tools know where to find it.
     * set this to false if you don't need it
     */
    devtool: 'source-map',
    module: {
        rules: rules,
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },
    plugins: plugins( argv ),
    externals: {
        jquery: 'jQuery'
    }
});
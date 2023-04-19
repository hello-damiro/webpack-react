const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production', // environment: use 'development' if necessary. // use 'development' if necessary. Production mode will make the output files minified/uglified. Development mode, will not.
    devtool: 'source-map', // filename.map.js files use for debugging
    performance: { hints: false },
    entry: { bundle: path.resolve(__dirname, 'src/index.js') },
    output: {
        filename: '[name].js', // '[name]-[contenthash].js', // will inherit the name from the entry
        path: path.resolve(__dirname, 'dist'),
        clean: true, // delete exess files every issues of build command
    },
    devServer: {
        static: { directory: path.resolve(__dirname, 'dist') },
        port: 8080,
        open: true, // open browser
        hot: true, // hot reload
        compress: true, // enable gzip compression
        historyApiFallback: true, // enable browser history fallback
    },
    module: {
        rules: [
            {
                // BABEL LOADERS
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
                },
            },
            {
                // Babel config for images
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                // Babel config for SVG as react component
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                // CSS LOADERS WITH MODULES
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1, // applies CSS modules on @imported resources
                            modules: true, // enable CSS modules
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                // CSS LOADERS ONLY
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // dist/index.html
            template: 'src/template.html', // src/template.html
            favicon: 'src/assets/images/favicon.png', // favicon
        }),
    ],
};

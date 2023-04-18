# Weback React Starter

Starter bundle files for creating react applications using webpack.

</br>

## Prepare environment

</br>

1. Initialize npm to create `package.json`

    ```bash
    npm init -y
    ```

2. Install React production dependencies

    ```bash
    npm i react react-dom
    ```

    From here onwards. all the dependency installations will be for development (`-D`) only

3. Install Webpack and its dependencies

    ```bash
    npm i -D webpack webpack-dev-server webpack-cli
    ```

4. Prepare files and directories

    ```bash
    mkdir dist src src/styles src/assets src/assets/images src/assets/fonts && touch src/index.js src/template.html src/styles/style.css webpack.config.js .gitignore
    ```

5. Configure the created `webpack.config.js`

    ```javascript
    const path = require('path');

    module.exports = {
        mode: 'production', // environment: use 'development' if necessary. // use 'development' if necessary. Production mode will make the output files minified/uglified. Development mode, will not.
        entry: {
            bundle: path.resolve(__dirname, 'src/index.js'), // main source file
        },
        output: {
            filename: '[name].js', // '[name]-[contenthash].js', // will inherit the name from the entry
            path: path.resolve(__dirname, 'dist'),
            clean: true, // delete exess files every issues of build command
        },
        devtool: 'source-map', // filename.map.js files use for debugging
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            port: 8080,
            open: true, // open browser
            hot: true, // hot reload
            compress: true, // enable gzip compression
            historyApiFallback: true, // enable browser history fallback
        },
    };
    ```

    `package.json` should now contain the following:

    ```json
    {
        ...
        "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0"
        },
        "devDependencies": {
            "webpack": "^5.79.0",
            "webpack-cli": "^5.0.1",
            "webpack-dev-server": "^4.13.3"
        }
    }
    ```

6. Add `source` _key:value_ pair on `package.json`, since webpack will replace the `main` with its file

    ```json
    ...
    "source": "./src/template.html",
    "main": "webpack.config.js",
    ...
    ```

7. add `node_modules` to `.gitignore`

    ```bash
    node_modules
    ```

</br>

## Webpack workflow scripts

</br>

The following are suggested scripts inside `scripts` array of `package.json` contains keywords to be used for workflow automation in development.

```json
"scripts": {
    "dev": "webpack-dev-server --open",
    "deploy": "webpack",
    "clean": "rm -rf dist/*",
    "build": "npm run clean && npm run deploy",
},
```

to use the scripts: `npm run [key]` as such:

```bash
npm run dev
npm run build
```

</br>

</br>

## Install other dev dependencies

</br>

### A. HTML Webpack Plugin

</br>

1. Install `html-webpack-plugin`

    ```bash
    npm i -D html-webpack-plugin
    ```

2. Configure `html-webpack-plugin` on `webpack.config.js`

    ```js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // Dont forget this!

    module.exports = {
        ...
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html', // dist/index.html
                template: 'src/template.html', // src/template.html
                favicon: 'src/assets/images/favicon.png', // Optional favicon
            }),
        ],
    };
    ```

    Be sure to include a **favicon** file on the `./assets/images` for it to not have an error thrown.

</br>

### B. Babel

</br>

1. Install Babel and its react dependencies for ES6 support

    ```bash
    npm i -D babel-core babel-loader babel-preset-env babel-preset-react
    ```

2. Create a `modules` section at `webpack.config.js` to contain all dev dependencies config.

    ```js
    {
        ...
        modules: {
            rules: [
                {
                    // BABEL LOADERS
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
    }
    ```

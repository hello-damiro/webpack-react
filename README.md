# Webpack React Starter

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
    mkdir dist src src/components src/styles src/assets src/assets/images src/assets/fonts && touch src/App.js src/index.js src/template.html src/styles/style.css webpack.config.js .gitignore
    ```

5. Configure the created `webpack.config.js`

    ```javascript
    const path = require('path');

    module.exports = {
        mode: 'production', // environment: use 'development' if necessary. // use 'development' if necessary. Production mode will make the output files minified/uglified. Development mode, will not.
        devtool: 'source-map', // filename.map.js files use for debugging
        performance: { hints: false }, // reduce bundle files size
        entry: { bundle: path.resolve(__dirname, 'src/index.js') }, // main source file
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

6. Add `node_modules` to `.gitignore`

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

1. Install Babel and its react dependencies for ES6 support. Procedure was done using this [tutorial](https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9).

    ```bash
    npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
    ```

2. Create a `modules` section at `webpack.config.js` to contain all dev dependencies config.

    ```js
    {
        ...
        modules: {
            rules: [
                {
                    // BABEL LOADERS
                    test: /\.js$|jsx/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
                    },
                }
            ],
        },
    }
    ```

</br>

### 3. CSS

</br>

1. Install `style-loader` and `css-loader`

    ```bash
    npm i -D style-loader css-loader
    ```

2. Configure at `modules` section at `webpack.config.js`

    ```js
    {
        ...
        modules: {
            rules: [
                ...
                {
                    // IMAGE LOADER
                    test: /\.(png|jp(e*)g|svg|gif)$/,
                    use: ['file-loader'],
                },
                {
                    // SVG AS REACT COMPONENT
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
    }
    ```

3. Import on `index.js` file the `style.css`

    ```js
    import './styles/style.css';
    ```

</br>

## Initial React files and testing

</br>

1. `template.html` should contain a `div` with an `id="root"`

    ```html
    <!DOCTYPE html>
    <html lang="en">
        ...
        <body>
            <div id="root"></div>
        </body>
    </html>
    ```

2. Create some styles in `style.css` at styles folder

    ```css
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;700&display=swap');
    /* @import url('reset.css'); */

    :root {
        --system-ui: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        --gray: #d5d5d5;
        --yellow-lt: #eed9c3;
        --yellow: #e3b261;
        --blue: #111827;
    }

    body {
        background: var(--blue);
        color: var(--gray);
        font-family: 'Roboto Slab', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        margin: 32px;
    }

    h1 {
        font-size: 2rem;
        color: var(--yellow);
    }
    ```

3. `index.js` should contain a pointer to the `root` div where react should render

    ```js
    import './styles/style.css';

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
    ```

4. Create a test component to display something on the browser when we run `npm run dev`

    ```js
    import React from 'react';

    function App() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }

    export default App;
    ```

If everything are installed succssfully the `div` with **Hello World** should be displayed.

</br>

## Deploying to gIthub.io pages

</br>

Original article [here](https://gist.github.com/cobyism/4730490):

Assume that we need to publish dist directory to github pages

1. Make sure git knows about your subtree (the subfolder with your site).

    ```bash
    git add dist && git commit -m "Initial dist subtree commit"
    ```

2. Use subtree push to send it to the gh-pages branch on GitHub

    ```bash
    git subtree push --prefix dist origin gh-pages
    ```

Just make sure dist is the folder name containing the deployment files
OPTIONAL: Add a script in package.json to automate deployment to github pages

```bash
"scripts": {
    ...
    "push": "git subtree push --prefix dist origin gh-pages"
},
```

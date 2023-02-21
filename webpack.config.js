/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const DEMOS = ['tfjs_webgl', 'tfjs_wasm'];

module.exports = (env) => {
  const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      open: true,
      headers: {
        // These two headers are requried for cross origin isolation.
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      },
      https: true,
      host: 'local-ip',
      port: 8091,
      historyApiFallback: {
        disableDotRule: true,
      },
      watchFiles: ['src/**/*'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        chunks: ['tfjs_wasm_draw'],
      }),
      ...DEMOS.map((d) => new HtmlWebpackPlugin({
        template: 'index.html',
        filename: `${d}_draw.html`,
        chunks: [`${d}_draw`],
      })),
      new HtmlWebpackPlugin({
        filename: 'example.html',
        chunks: ['example'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: 'node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm'},
          {from: 'node_modules/@handtracking.io/yoha/models/', to: './'},
        ]
      })
    ],
    entry: {
      example: {
        import: './src/entry.js',
        filename: 'example.js',
      },
      ...DEMOS.map((d) => {
        const chunkName = `${d}_draw`;
        return {
          [chunkName]: {
            import: `./src/${d}_entry.js`,
            filename: `${d}_draw.js`,
          }
        }
      }).reduce((cur, prev, index) => {return {...prev, ...cur};}, {})
    }
  };

  return [config];
}

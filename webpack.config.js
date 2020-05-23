const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const commonConfig = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [new LoadablePlugin()],
};

const clientConfig = {
  ...commonConfig,
  target: 'web',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, './build/client'),
  },
};

const serverConfig = {
  ...commonConfig,
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, './build/server'),
  },
  externals: [nodeExternals()],
};

module.exports = [serverConfig, clientConfig];

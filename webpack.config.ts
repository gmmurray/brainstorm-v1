import path from 'path';

module.exports = {
  entry: './src/alpine/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './src/views/public/js'),
  },
  mode: 'development',
};

import path from 'path';

module.exports = {
  entry: './src/alpine/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src/alpine/'),
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './src/views/public/js'),
  },
  mode: 'development',
};

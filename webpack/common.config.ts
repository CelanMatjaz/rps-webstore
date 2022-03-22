import * as path from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const projectPath = path.resolve('.');

export const buildPath = path.resolve(
  projectPath,
  'build',
  isProd ? 'prod' : 'debug'
);
export const serverBuildPath = path.resolve(buildPath, 'server');
export const clientBuildPath = path.resolve(buildPath, 'public');

export const srcPath = path.resolve(projectPath, 'src');
export const serverSrcPath = path.resolve(srcPath, 'server');
export const clientSrcPath = path.resolve(srcPath, 'client');

export const commonConfig = (): webpack.Configuration => {
  const config: webpack.Configuration = {
    stats: { errorDetails: true, errorStack: true },
    mode,
    devtool: !isProd ? 'eval-cheap-module-source-map' : undefined,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'ts-loader',
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-typescript',
                  '@babel/preset-react',
                  '@babel/preset-env',
                ],
                plugins: [
                  '@babel/plugin-transform-runtime',
                  '@babel/plugin-syntax-dynamic-import',
                ],
                retainLines: true,
              },
            },
          ],
          exclude: ['/node_modules'],
        },
        {
          test: /\.(s?css|sass)$/,
          exclude: ['/node_modules'],
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'favicon.ico',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.CleanPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProd ? 'production' : 'development'
        ),
      }),
      new MiniCssExtractPlugin({}),
    ],
    optimization: {
      minimize: isProd,
    },
  };

  return config;
};

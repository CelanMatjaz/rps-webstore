import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import * as path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {
    commonConfig,
    clientSrcPath,
    clientBuildPath,
    //isProd,
} from './common.config';

const entry = path.resolve(clientSrcPath, 'index.tsx');

export default (): webpack.Configuration => {
    return webpackMerge(commonConfig(), {
        target: 'web',
        entry: [entry, './favicon.ico'],
        output: {
            path: clientBuildPath,
            publicPath: '/public',
            filename: '[name].bundle.js',
        },
        plugins: [new MiniCssExtractPlugin(), new webpack.CleanPlugin()],
        externals: ['commonjs'],
    });
};

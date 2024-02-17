import { ProgressPlugin, type WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { WebpackConfigOptions } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default ({ paths: { html }, isDev }: WebpackConfigOptions): WebpackPluginInstance[] => [
  new HtmlWebpackPlugin({ template: html }),
  isDev ? new ProgressPlugin() : undefined,
  !isDev
    ? new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    : undefined,
];

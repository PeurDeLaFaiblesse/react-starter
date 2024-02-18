import { ProgressPlugin, type WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { WebpackConfigOptions } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default ({ paths: { html }, isDev }: WebpackConfigOptions): WebpackPluginInstance[] => {
  const plugins: WebpackPluginInstance[] = [new HtmlWebpackPlugin({ template: html })];

  if (isDev) {
    plugins.push(new ProgressPlugin());
  } else {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};

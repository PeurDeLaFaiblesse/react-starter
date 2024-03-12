import { ProgressPlugin, type WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { WebpackConfigOptions } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export default ({ paths, isDev }: WebpackConfigOptions): WebpackPluginInstance[] => {
  const plugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico') }),
    new ForkTsCheckerWebpackPlugin(),
  ];

  if (isDev) {
    plugins.push(...[new ProgressPlugin(), new ReactRefreshPlugin()]);
  } else {
    plugins.push(
      ...[
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new BundleAnalyzerPlugin(),
        new CopyPlugin({
          patterns: [{ from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.outputPath, 'locales') }],
        }),
      ],
    );
  }

  return plugins;
};

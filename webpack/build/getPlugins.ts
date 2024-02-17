import { ProgressPlugin, type WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { WebpackConfigOptions } from './types';

export default ({ paths: { html }, isDev }: WebpackConfigOptions): WebpackPluginInstance[] => [
  new HtmlWebpackPlugin({ template: html }),
  isDev ? new ProgressPlugin() : undefined,
];

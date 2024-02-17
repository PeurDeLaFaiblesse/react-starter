import type { Configuration } from 'webpack';
import getResolvers from './getResolvers';
import getPlugins from './getPlugins';
import getLoaders from './getLoaders';
import type { WebpackConfigOptions } from './types';
import getDevServer from './getDevServer';

export default (options: WebpackConfigOptions): Configuration => {
  const { mode, paths, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.outputPath,
      clean: true,
    },
    module: {
      rules: getLoaders(options),
    },
    resolve: getResolvers(),
    plugins: getPlugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? getDevServer(options) : undefined,
  };
};

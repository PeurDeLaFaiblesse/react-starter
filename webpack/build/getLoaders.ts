import { RuleSetRule } from 'webpack';
import { WebpackConfigOptions } from './types';

export default (options: WebpackConfigOptions): RuleSetRule[] => {
  return [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ];
};

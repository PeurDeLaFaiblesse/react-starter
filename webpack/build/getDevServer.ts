import type { Configuration } from 'webpack-dev-server';
import type { WebpackConfigOptions } from './types';

export default ({ port }: WebpackConfigOptions): Configuration => ({
  port,
  open: true,
});

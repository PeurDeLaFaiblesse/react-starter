import { ResolveOptions } from 'webpack';
import { WebpackConfigOptions } from './types';

export default ({ paths: { src } }: WebpackConfigOptions): ResolveOptions => ({
  extensions: ['.tsx', '.ts', '.js'],
  alias: {
    '@': src,
  },
});

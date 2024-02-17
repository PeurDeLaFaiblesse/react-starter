import { RuleSetRule } from 'webpack';
import { WebpackConfigOptions } from './types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default ({ isDev }: WebpackConfigOptions): RuleSetRule[] => {
  const svgUrl = {
    test: /\.svg$/i,
    type: 'asset',
    resourceQuery: /url/, // *.svg?url
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
    use: ['@svgr/webpack'],
  };

  const cssLoader = {
    test: /\.(sa|sc|c)ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\.\w+$/i,
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  };

  return [svgUrl, svgrLoader, tsLoader, cssLoader];
};

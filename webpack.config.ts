import { type BuildPaths, type Environments, getWebpackConfig } from './webpack/build';
import path from 'path';

export default (env: Environments) => {
  const mode = env.mode ?? 'development';
  const port = env.port ?? 3000;
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    outputPath: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  return getWebpackConfig({
    port,
    mode,
    paths,
    isDev: mode === 'development',
  });
};

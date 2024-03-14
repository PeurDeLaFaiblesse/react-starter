import {
  type BuildPaths,
  type Environments,
  getWebpackConfig,
} from "@packages/webpack-build";
import path from "path";
import { container } from "webpack";
import packageJson from "./package.json";

export default (env: Environments) => {
  const mode = env.mode ?? "development";
  const port = env.port ?? 3002;
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    outputPath: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config = getWebpackConfig({
    port,
    mode,
    paths,
    isDev: mode === "development",
  });

  config.plugins.push(
    new container.ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: {
        "./routes": "./src/router/index.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    }),
  );

  return config;
};

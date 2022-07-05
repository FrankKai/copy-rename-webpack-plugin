const path = require("path");
const CopyRenameWebpackPlugin = require("../../src/index.js");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyRenameWebpackPlugin({
      entry: "main.js",
      output: [
        "../build/pre/main-pre.js",
        "../build/prod/main-prod.js",
      ],
    }),
  ],
};

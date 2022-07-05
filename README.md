# copy-rename-webpack-plugin
Copy one file to multiple directories and rename it

``` 
.
|____dist
| |____main.js
```

=>
```
.
|____dist
| |____main.js
|____build
| |____prod
| | |____main-prod.js
| |____pre
| | |____main-pre.js
```

## usage
```shell
yarn add -D copy-rename-webpack-plugin
```

webpack.config.js
```js
const path = require("path");
const CopyRenameWebpackPlugin = require("copy-rename-webpack-plugin");

module.exports = {
  ...
  output: {
    filename: "main.js",
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
```

## options

### entry
entry need to match one of webpack output's filename.

such as: "main.js"

### output
output must be an array which item is a file string with path.

such as: "../build/pre/main-pre.js"
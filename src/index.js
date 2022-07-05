/**
 * See the webpack docs for more information about plugins:
 * https://webpack.js.org/contribute/writing-a-plugin/#basic-plugin-architecture
 */

 class CopyRenameWebpackPlugin {
  constructor(options = {}) {
    this.options = { ...options };
  }
  apply(compiler) {
    const pluginName = CopyRenameWebpackPlugin.name;

    const { webpack } = compiler;
    const { Compilation } = webpack;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          // 靠后一点的阶段，确保所有资源能被加入到插件的编译中
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const { entry, output } = this.options;
          // assets是包含所有静态资源的对象
          // 在编译阶段，对象的键是assets的路径，对象的值是assets的文件内容

          // 遍历所有静态文件，匹配到需要复制的文件
          let fileContent = null;
          for (const [key, value] of Object.entries(assets)) {
            console.log(key, value)
            if (entry === key) {
              fileContent = value;
              break;
            }
          }
          // 把资源添加给compilation，从而自动由webpack生成到目标目录

          for (const dir of output) {
            compilation.emitAsset(dir, fileContent);
          }
        }
      );
    });
  }
}

module.exports = CopyRenameWebpackPlugin;

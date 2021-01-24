const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: './',
      chainWebpackMainProcess: (config) => {
        config.resolve.alias.set('@', resolve('src'));
      },
      chainWebpackRendererProcess: (config) => {
        config.resolve.alias.set('@', resolve('src'));
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end();
        config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader')
          .tap((options) =>
            Object.assign(options, {
              limit: 80240,
            })
          );
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]',
          })
          .end();
      },
      mainProcessFile: 'src/electron/index.js',
    },
  },
  pages: {
    input: 'src/input.js',
    output: 'src/output.js',
  },
};

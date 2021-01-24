const files = require.context('.', true, /\.js$/);
const modules = [];
files.keys().forEach((key) => {
  if (key !== './index.js') {
    const name = key.replace(/(\.\/|\.js)/g, '').replace(/\//g, '_');
    modules[name] = files(key).default;
  }
});
export default modules;

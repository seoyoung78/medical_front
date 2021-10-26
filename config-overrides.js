var path = require('path');
const fs = require('fs');
require('dotenv').config();

const getBabelLoader = (config, isOutsideOfApp) => {
  let babelLoaderFilter;
  if (isOutsideOfApp) {
    babelLoaderFilter = rule =>
      rule.loader && rule.loader.includes("babel") && rule.exclude;
  } else {
    babelLoaderFilter = rule =>
      rule.loader && rule.loader.includes("babel") && rule.include;
  }

  // First, try to find the babel loader inside the oneOf array.
  // This is where we can find it when working with react-scripts@2.0.3.
  let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf))
    .oneOf;

  let babelLoader = loaders.find(babelLoaderFilter);

  // If the loader was not found, try to find it inside of the "use" array, within the rules.
  // This should work when dealing with react-scripts@2.0.0.next.* versions.
  if (!babelLoader) {
    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), []);
    babelLoader = loaders.find(babelLoaderFilter);
  }
  return babelLoader;
};

module.exports = {
  webpack: (config, env) => {
    const lunaOrbitPath = path.resolve(((_path) => {
      if (fs.lstatSync(_path).isSymbolicLink()) {
        return fs.realpathSync(_path);
      }
      return _path;
    })(path.resolve(process.cwd(), '..', '..', 'node_modules', 'luna-orbit')));
    const babelLoader = getBabelLoader(config, false);
    babelLoader.include = [babelLoader.include].concat(lunaOrbitPath);
    const outsideBabelLoader = getBabelLoader(config, true);
    outsideBabelLoader.exclude = [outsideBabelLoader.exclude].concat(lunaOrbitPath);
    return config;
  }
};
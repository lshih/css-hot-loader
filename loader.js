const loaderUtils = require('loader-utils');
const defaultOptions = {
  selector: 'data-hot',
};
module.exports = function(content) {
  this.cacheable();
  const options = Object.assign(
    {},
    defaultOptions,
    loaderUtils.getOptions(this)
  );

  return content + `
    if(module.hot) {
      // ${Date.now()}
      var cssReload = require(${loaderUtils.stringifyRequest(this, require.resolve('./hotModuleReplacement'))})(module.id, ${JSON.stringify(options)});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  `;
};
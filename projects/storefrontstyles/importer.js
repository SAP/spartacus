// Script used by node sass to resolve external imputs
// Used only to test library
module.exports = function importer(url, prev, done) {
  if (url[0] === '~') {
    return { file: resolveModule(url.substr(1), prev) };
  } else if (
    url === 'theme' ||
    url === 'mixins' ||
    url === 'functions' ||
    url === 'theme.scss'
  ) {
    return { file: resolveRelative(url, prev), prev };
  } else {
    return null;
  }
};

// Resolve the import path for external modules (ex: Bootstrap)
function resolveModule(targetUrl, prev) {
  var baseUrl = prev.split('projects')[0];
  return baseUrl.concat('node_modules/', targetUrl);
}

// Resolve the imports that use just the filename
function resolveRelative(url, prev) {
  var baseUrl = prev.split('scss')[0];
  return baseUrl.concat('scss/_', url);
}

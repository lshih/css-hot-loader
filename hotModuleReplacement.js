function reloadStyles(options) {
  var elements = document.querySelectorAll('link[' + options.selector + ']');

  for (var i = 0; i < elements.length; i++) {
    try {
      reloadStyle(elements[i]);
    } catch (e) {
      console.error('[webpack-extract-css-hot-reload]: Failed to reload', elements[i], e);
    }
  }
}

function reloadStyle(element) {
  var newEl = element.cloneNode();

  newEl.addEventListener('load', function () {
    element.remove();
  });

  newEl.href = getReloadUrl(element.href);
  element.parentNode.insertBefore(newEl, element.nextSibling);
}

function getReloadUrl(href) {
  if (!href) {
    return '';
  }

  var strippedUrl = stripUrl(href);

  return generateReloadUrl(strippedUrl);
}

//function to strip away the random number appended to the url
function stripUrl(url) {
  if (!url) {
    return '';
  }

  var matches = url.match(/[&?][0-9]+$/i);

  if (matches) {
    var match = matches[0];

    return url.slice(0, -match.length);
  }

  return url;
}

function generateReloadUrl(url) {
  if (!url) {
    return '';
  }

  var connector = url.indexOf('?') !== -1 ? '&' : '?';

  return url + connector + Date.now();
}

module.exports = function (moduleId, options) {
  return function () {
    if (typeof document === 'undefined') {
      return;
    }

    reloadStyles(options);
  };
};

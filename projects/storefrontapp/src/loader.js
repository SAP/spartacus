function appendLink() {
  document.head.appendChild(_createLink('styles/blue.css'));
}

function addLoadingToPicture() {
  document.head.appendChild(_createLink('styles/picture.css'));
}

function _createLink(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;

  return link;
}

function getElem(selector, style) {
  let element = document.querySelector(selector);
  if (element) {
    element = document.querySelector(selector).shadowRoot
      ? document.querySelector(selector).shadowRoot
      : document.querySelector(selector);
    element.appendChild(_createLink(`styles/${style}`));
  } else {
    console.warn(`No selector named ${selector} found.`);
    console.log('Available selectors :', getComponents());
  }
}

function getComponents() {
  const result = document.evaluate(
    `//*[starts-with(name(), 'cx')]`,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );

  var node,
    nodes = [];
  while ((node = result.iterateNext())) {
    if (node.nodeName.toLowerCase() !== 'cx-dynamic-slot') {
      nodes.push(node.nodeName.toLowerCase());
    }
  }

  return nodes;
}

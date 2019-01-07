function productSummaryAlt() {
  _getElem('cx-product-summary', 'product-summary_alt.css');
}
function productSummaryAlt1() {
  _getElem('cx-product-summary', 'product-summary_alt1.css');
}
function _createLink(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;

  return link;
}
function _getElem(selector, style) {
  let element = document.querySelector(selector);
  if (element) {
    element = document.querySelector(selector).shadowRoot
      ? document.querySelector(selector).shadowRoot
      : document.querySelector(selector);
    element.appendChild(_createLink(`assets/css/${style}`));
  } else {
    console.warn(`No selector named ${selector} found.`);
  }
}

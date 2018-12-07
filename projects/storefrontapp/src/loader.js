function appendLink() {
  document.head.appendChild(_createLink('styles/colors.css'));
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

import * as fs from 'fs';

import * as path from 'path';

const CREATE_LINK = `function _createLink(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;

  return link;
}\n`;

const APPEND_FUNCTION = `function PLACEHOLDER() {
  _getElem('SELECTOR', 'STYLES');
}\n`;

const GET_ELEM = `function _getElem(selector, style) {
  let element = document.querySelector(selector);
  if (element) {
    element = document.querySelector(selector).shadowRoot
      ? document.querySelector(selector).shadowRoot
      : document.querySelector(selector);
    element.appendChild(_createLink(\`assets/css/\${style}\`));
  } else {
    console.warn(\`No selector named \${selector} found.\`);
  }
}\n`;

function buildLoader() {
  const files = fs.readdirSync(
    path.join('projects', 'storefrontapp', 'src', 'assets', 'css')
  );
  let customLoader = '';

  for (const file of files) {
    const fileParts = file.split('/');
    const fileName = fileParts[fileParts.length - 1];
    const component = fileName.split('_')[0];
    const style = fileName.split('_')[1].replace('.css', '');

    customLoader = customLoader.concat(
      APPEND_FUNCTION.replace(
        'PLACEHOLDER',
        camelCaseIfy([...component.split('-'), style])
      )
        .replace('STYLES', fileName)
        .replace('SELECTOR', 'cx-'.concat(component))
    );
  }

  customLoader = customLoader.concat(CREATE_LINK);
  customLoader = customLoader.concat(GET_ELEM);

  fs.writeFileSync(
    path.join('projects', 'storefrontapp', 'src', 'customLoader.js'),
    customLoader,
    { flag: 'w' }
  );
}

function camelCaseIfy(parts: string[]): string {
  // Starts at one because we don't want to capritalize the first part
  for (let i = 1; i < parts.length; i++) {
    parts[i] = capitalize(parts[i]);
  }
  return parts.join('');
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.substr(1);
}

buildLoader();

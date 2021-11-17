import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  DefaultTreeDocument,
  DefaultTreeElement,
  DefaultTreeNode,
  parse as parseHtml,
} from 'parse5';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * see: https://github.com/angular/components/blob/master/src/cdk/schematics/utils/html-manipulation.ts
 */
/** Appends the given element HTML fragment to the `<head>` element of the specified HTML file. */
export function appendHtmlElementToHead(
  host: Tree,
  htmlFilePath: string,
  elementHtml: string
) {
  const htmlFileBuffer = host.read(htmlFilePath);

  if (!htmlFileBuffer) {
    throw new SchematicsException(
      `Could not read file for path: ${htmlFilePath}`
    );
  }

  const htmlContent = htmlFileBuffer.toString();

  if (htmlContent.includes(elementHtml)) {
    return;
  }

  const headTag = getHtmlHeadTagElement(htmlContent);

  if (!headTag) {
    throw Error(
      `Could not find '<head>' element in HTML file: ${htmlFileBuffer}`
    );
  }

  // We always have access to the source code location here because the `getHeadTagElement`
  // function explicitly has the `sourceCodeLocationInfo` option enabled.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const endTagOffset = headTag.sourceCodeLocation!.endTag.startOffset;
  const indentationOffset = getChildElementIndentation(headTag);
  const insertion = `${' '.repeat(indentationOffset)}${elementHtml}`;

  const recordedChange = host
    .beginUpdate(htmlFilePath)
    .insertRight(endTagOffset, `${insertion}\n`);

  host.commitUpdate(recordedChange);
}
/** Parses the given HTML file and returns the head element if available. */
function getHtmlHeadTagElement(htmlContent: string): DefaultTreeElement | null {
  return getElementByTagName('head', htmlContent);
}
/** Finds an element by its tag name. */
function getElementByTagName(
  tagName: string,
  htmlContent: string
): DefaultTreeElement | null {
  const document = parseHtml(htmlContent, {
    sourceCodeLocationInfo: true,
  }) as DefaultTreeDocument;
  const nodeQueue = [...document.childNodes];

  while (nodeQueue.length) {
    const node = nodeQueue.shift() as DefaultTreeElement;

    if (node.nodeName.toLowerCase() === tagName) {
      return node;
    } else if (node.childNodes) {
      nodeQueue.push(...node.childNodes);
    }
  }

  return null;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * See https://github.com/angular/components/blob/master/src/cdk/schematics/utils/parse5-element.ts
 */
/** Determines the indentation of child elements for the given Parse5 element. */
function getChildElementIndentation(element: DefaultTreeElement) {
  const childElement = element.childNodes.find((node: DefaultTreeNode) => {
    return !!(node as any).tagName;
  }) as DefaultTreeElement | null;

  if (
    (childElement && !childElement.sourceCodeLocation) ||
    !element.sourceCodeLocation
  ) {
    throw new SchematicsException(
      'Cannot determine child element indentation because the ' +
        'specified Parse5 element does not have any source code location metadata.'
    );
  }

  const startColumns = childElement
    ? // In case there are child elements inside of the element, we assume that their
      // indentation is also applicable for other child elements.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      childElement.sourceCodeLocation!.startCol
    : // In case there is no child element, we just assume that child elements should be indented
      // by two spaces.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      element.sourceCodeLocation!.startCol + 2;

  // Since Parse5 does not set the `startCol` properties as zero-based, we need to subtract
  // one column in order to have a proper zero-based offset for the indentation.
  return startColumns - 1;
}

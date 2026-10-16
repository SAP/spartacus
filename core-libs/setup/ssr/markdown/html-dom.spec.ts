/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  parseDocument,
  findFirstElement,
  findAllElements,
  getTextContent,
  getAttribute,
} from './html-dom';

describe('html-dom', () => {
  it('finds the first element in document order', () => {
    const doc = parseDocument('<main>a</main><main>b</main>');
    const main = findFirstElement(doc, 'main');
    expect(main && getTextContent(main)).toBe('a');
  });

  it('finds all elements of a tag in document order', () => {
    const doc = parseDocument('<a>1</a><a>2</a>');
    expect(findAllElements(doc, 'a').map(getTextContent)).toEqual(['1', '2']);
  });

  it('reads an attribute value', () => {
    const doc = parseDocument('<link rel="canonical" href="/x">');
    const link = findFirstElement(doc, 'link');
    expect(link && getAttribute(link, 'href')).toBe('/x');
  });

  it('returns undefined for a missing attribute', () => {
    const doc = parseDocument('<link rel="canonical">');
    const link = findFirstElement(doc, 'link');
    expect(link && getAttribute(link, 'href')).toBeUndefined();
  });

  it('concatenates nested text content', () => {
    const doc = parseDocument('<a><span>Au</span>dio</a>');
    const a = findFirstElement(doc, 'a');
    expect(a && getTextContent(a)).toBe('Audio');
  });

  it('decodes HTML entities in text content', () => {
    const doc = parseDocument('<a>Audio &amp; Video</a>');
    const a = findFirstElement(doc, 'a');
    expect(a && getTextContent(a)).toBe('Audio & Video');
  });
});

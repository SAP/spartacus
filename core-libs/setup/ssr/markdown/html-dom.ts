/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { parse, type DefaultTreeAdapterMap } from 'parse5';

export type HtmlNode = DefaultTreeAdapterMap['node'];
export type HtmlElement = DefaultTreeAdapterMap['element'];

/** Parses an HTML string into a parse5 document tree. */
export function parseDocument(html: string): HtmlNode {
  return parse(html, { sourceCodeLocationInfo: true }) as unknown as HtmlNode;
}

/**
 * Depth-first, document-order search for the first element with the given
 * (lowercase) tag name. The Node SSR runtime has no DOMParser, so traversal
 * is done over the parse5 tree.
 */
export function findFirstElement(
  root: HtmlNode,
  tagName: string
): HtmlElement | undefined {
  const nodes = [root];
  while (nodes.length > 0) {
    const node = nodes.pop() as HtmlNode;
    if ('tagName' in node && node.tagName === tagName) {
      return node;
    }
    if ('childNodes' in node) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        nodes.push(node.childNodes[i]);
      }
    }
  }
  return undefined;
}

/** All elements with the given (lowercase) tag name, in document order. */
export function findAllElements(
  root: HtmlNode,
  tagName: string
): HtmlElement[] {
  const out: HtmlElement[] = [];
  const nodes = [root];
  while (nodes.length > 0) {
    const node = nodes.pop() as HtmlNode;
    if ('tagName' in node && node.tagName === tagName) {
      out.push(node);
    }
    if ('childNodes' in node) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        nodes.push(node.childNodes[i]);
      }
    }
  }
  return out;
}

/**
 * Concatenated text of all descendant text nodes. parse5 already decodes
 * HTML entities in text nodes, so the result needs no further entity decoding.
 */
export function getTextContent(node: HtmlNode): string {
  if (node.nodeName === '#text' && 'value' in node) {
    return node.value;
  }
  if ('childNodes' in node) {
    return node.childNodes.map(getTextContent).join('');
  }
  return '';
}

/** Value of the named attribute, or `undefined` when absent. */
export function getAttribute(
  el: HtmlElement,
  name: string
): string | undefined {
  return el.attrs?.find((a) => a.name === name)?.value;
}

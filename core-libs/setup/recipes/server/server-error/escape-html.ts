/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * See: https://github.com/angular/angular/blob/24950dd2a5b6a69a6afc80b8e2041f99bfd47e06/packages/platform-browser/src/browser/transfer_state.ts#L12-L32
 */

export function escapeHtml(text: string): string {
  const escapedText: { [k: string]: string } = {
    '&': '&a;',
    '"': '&q;',
    "'": '&s;',
    '<': '&l;',
    '>': '&g;',
  };
  return text.replace(/[&"'<>]/g, (s) => escapedText[s]);
}

export function unescapeHtml(text: string): string {
  const unescapedText: { [k: string]: string } = {
    '&a;': '&',
    '&q;': '"',
    '&s;': "'",
    '&l;': '<',
    '&g;': '>',
  };
  return text.replace(/&[^;]+;/g, (s) => unescapedText[s]);
}

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { toJsRegExp } from './to-js-reg-exp';

describe('toJsRegExp', () => {
  it.each<[string, RegExp]>([
    ['electronics-spa', /electronics-spa/],
    ['(?i)pattern', /pattern/i],
    ['(?gimu)pattern', /pattern/gimu],
    ['(?i)\\s test \\t tab \\n', /\s test \t tab \n/i],
    ['', new RegExp('')],
  ])('converts %p', (input, expected) => {
    const result = toJsRegExp(input);

    expect(result?.source).toBe(expected.source);
    expect(result?.flags).toBe(expected.flags);
  });

  it.each(['(?x)electronics', '(?iX)pattern', 'x*+', '(unclosed'])(
    'returns null for unsupported input %p',
    (input) => expect(toJsRegExp(input)).toBeNull()
  );
});

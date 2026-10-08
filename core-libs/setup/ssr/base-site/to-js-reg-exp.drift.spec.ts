/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { JavaRegExpConverter } from '@spartacus/core';
import { toJsRegExp } from './to-js-reg-exp';

/**
 * Shared corpus of Java regexp patterns, representative of OCC base-site
 * `urlPatterns` plus edge cases around modifiers and JS-incompatible syntax.
 *
 * Drift guard: the pure-Node `toJsRegExp` port MUST produce the exact same
 * result as core's `JavaRegExpConverter.toJsRegExp` for every entry. If core
 * changes its conversion logic, this test fails and the port must be synced.
 */
const PATTERN_CORPUS: string[] = [
  'electronics-spa',
  '(?i)electronics-spa',
  '(?i)^https?://[^/]+/electronics-spa(/|$)',
  '(?i)^https?://electronics\\.example\\.com',
  '(?im)^apparel-uk-spa$',
  '(?iu)^https?://[^/]+/[a-z]{2}-spa',
  '(?gimu)pattern',
  '(?i)\\s test \\t tab \\n',
  '(?i)[.][a-zA-Z]+$',
  '',
  '(?x)electronics', // unsupported JS flag -> expected null on both
  '(?iX)electronics', // unsupported Java/JS modifier syntax
  'x*+', // Java possessive quantifier unsupported by JavaScript
  '(unclosed', // invalid JS syntax -> expected null on both
];

describe('toJsRegExp drift vs core JavaRegExpConverter', () => {
  let coreConverter: JavaRegExpConverter;

  beforeEach(() => {
    coreConverter = TestBed.inject(JavaRegExpConverter);
  });

  it.each(PATTERN_CORPUS)(
    'should produce the same result as core for pattern: %p',
    (pattern) => {
      const ported = toJsRegExp(pattern);
      const core = coreConverter.toJsRegExp(pattern);

      if (core === null) {
        expect(ported).toBeNull();
        return;
      }
      expect(ported).not.toBeNull();
      expect(ported?.source).toBe(core.source);
      expect(ported?.flags).toBe(core.flags);
    }
  );
});

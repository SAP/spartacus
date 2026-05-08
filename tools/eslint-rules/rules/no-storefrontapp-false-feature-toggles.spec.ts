/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleTester } from '@angular-eslint/test-utils';
import {
  rule,
  RULE_NAME,
  RULE_PATTERN,
} from './no-storefrontapp-false-feature-toggles';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // all true inside provideFeatureToggles
    `provideFeatureToggles({ toggle1: true, toggle2: true })`,
    // all true inside provideFeatureTogglesFactory
    `provideFeatureTogglesFactory(() => ({ toggle1: true, toggle2: true }))`,
    // false outside provideFeatureToggles* is fine
    `someOtherFunction({ toggle: false })`,
    // standalone false literal
    `const x = false;`,
    // disable comment WITH CXSPA suppresses the error (both noFalseFeatureToggle suppressed + CXSPA check passes)
    `provideFeatureToggles({
      // eslint-disable-next-line @rule-tester/no-storefrontapp-false-feature-toggles -- CXSPA-12345: enable once CI backend supports it
      myToggle: false,
    })`,
    // factory variant with valid CXSPA disable comment
    `provideFeatureTogglesFactory(() => {
      const toggles = {
        // eslint-disable-next-line @rule-tester/no-storefrontapp-false-feature-toggles -- CXSPA-99999: waiting for backend
        myToggle: false,
      };
      return toggles;
    })`,
    // disable comment for a different rule that contains this rule name as a substring - should NOT trigger missingCxspaTicket
    `// eslint-disable-next-line @rule-tester/no-storefrontapp-false-feature-toggles-extended
     someOtherFunction({ toggle: false })`,
  ],
  invalid: [
    // false inside provideFeatureToggles - simple
    {
      code: `provideFeatureToggles({ myToggle: false })`,
      errors: [
        { messageId: 'noFalseFeatureToggle', data: { name: 'myToggle' } },
      ],
    },
    // false inside provideFeatureTogglesFactory - inline object
    {
      code: `provideFeatureTogglesFactory(() => ({ myToggle: false }))`,
      errors: [
        { messageId: 'noFalseFeatureToggle', data: { name: 'myToggle' } },
      ],
    },
    // false inside provideFeatureTogglesFactory - block body with variable
    {
      code: `provideFeatureTogglesFactory(() => {
        const toggles = { myToggle: false };
        return toggles;
      })`,
      errors: [
        { messageId: 'noFalseFeatureToggle', data: { name: 'myToggle' } },
      ],
    },
    // multiple false toggles
    {
      code: `provideFeatureToggles({ toggle1: true, toggle2: false, toggle3: false })`,
      errors: [
        { messageId: 'noFalseFeatureToggle', data: { name: 'toggle2' } },
        { messageId: 'noFalseFeatureToggle', data: { name: 'toggle3' } },
      ],
    },
    // disable comment WITHOUT CXSPA - noFalseFeatureToggle suppressed but missingCxspaTicket reported
    {
      code: `provideFeatureToggles({
        // eslint-disable-next-line @rule-tester/no-storefrontapp-false-feature-toggles
        myToggle: false,
      })`,
      errors: [{ messageId: 'missingCxspaTicket' }],
    },
    // disable comment with description but no CXSPA ticket number
    {
      code: `provideFeatureToggles({
        // eslint-disable-next-line @rule-tester/no-storefrontapp-false-feature-toggles -- reason without ticket
        myToggle: false,
      })`,
      errors: [{ messageId: 'missingCxspaTicket' }],
    },
  ],
});

describe('RULE_PATTERN', () => {
  it('matches the bare rule name', () => {
    expect(RULE_PATTERN.test('no-storefrontapp-false-feature-toggles')).toBe(
      true
    );
  });

  it('matches the fully-qualified rule name', () => {
    expect(
      RULE_PATTERN.test('@nx/workspace-no-storefrontapp-false-feature-toggles')
    ).toBe(true);
  });

  it('does not match when the rule name contains the pattern as a prefix', () => {
    expect(
      RULE_PATTERN.test('no-storefrontapp-false-feature-toggles-extended')
    ).toBe(false);
  });

  it('does not match the fully-qualified extended rule name', () => {
    expect(
      RULE_PATTERN.test(
        '@nx/workspace-no-storefrontapp-false-feature-toggles-extended'
      )
    ).toBe(false);
  });
});

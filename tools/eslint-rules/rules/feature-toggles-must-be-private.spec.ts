/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleTester } from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './feature-toggles-must-be-private';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Valid: private modifier
    {
      code: `
        class MyComponent {
          private featureToggles = inject(FeatureToggles);
        }
      `,
    },
    // Valid: private with readonly
    {
      code: `
        class MyComponent {
          private readonly featureToggles = inject(FeatureToggles);
        }
      `,
    },
    // Valid: private with different property name
    {
      code: `
        class MyComponent {
          private toggles = inject(FeatureToggles);
        }
      `,
    },
    // Valid: private with Optional decorator
    {
      code: `
        class MyComponent {
          @Optional() private featureToggles = inject(FeatureToggles, { optional: true });
        }
      `,
    },
    // Valid: injecting different service
    {
      code: `
        class MyComponent {
          protected otherService = inject(OtherService);
        }
      `,
    },
    // Valid: injecting different service without modifier
    {
      code: `
        class MyComponent {
          someService = inject(SomeService);
        }
      `,
    },
    // Valid: property without inject
    {
      code: `
        class MyComponent {
          featureToggles = new FeatureToggles();
        }
      `,
    },
  ],
  invalid: [
    // Invalid: no access modifier (implicit public)
    {
      code: `
        class MyComponent {
          featureToggles = inject(FeatureToggles);
        }
      `,
      output: `
        class MyComponent {
          private featureToggles = inject(FeatureToggles);
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
    // Invalid: protected modifier
    {
      code: `
        class MyComponent {
          protected featureToggles = inject(FeatureToggles);
        }
      `,
      output: `
        class MyComponent {
          private featureToggles = inject(FeatureToggles);
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
    // Invalid: public modifier
    {
      code: `
        class MyComponent {
          public featureToggles = inject(FeatureToggles);
        }
      `,
      output: `
        class MyComponent {
          private featureToggles = inject(FeatureToggles);
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
    // Invalid: readonly without private
    {
      code: `
        class MyComponent {
          readonly featureToggles = inject(FeatureToggles);
        }
      `,
      output: `
        class MyComponent {
          private readonly featureToggles = inject(FeatureToggles);
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
    // Invalid: with decorator but no private
    {
      code: `
        class MyComponent {
          @Optional() featureToggles = inject(FeatureToggles, { optional: true });
        }
      `,
      output: `
        class MyComponent {
          @Optional() private featureToggles = inject(FeatureToggles, { optional: true });
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
    // Invalid: different property name without private
    {
      code: `
        class MyComponent {
          toggles = inject(FeatureToggles);
        }
      `,
      output: `
        class MyComponent {
          private toggles = inject(FeatureToggles);
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
    // Invalid: protected with readonly
    {
      code: `
        class MyComponent {
          protected readonly featureToggles = inject(FeatureToggles);
        }
      `,
      output: `
        class MyComponent {
          private readonly featureToggles = inject(FeatureToggles);
        }
      `,
      errors: [{ messageId: 'featureTogglesMustBePrivate' }],
    },
  ],
});

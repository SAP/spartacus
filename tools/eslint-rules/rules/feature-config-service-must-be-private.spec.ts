/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleTester } from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './feature-config-service-must-be-private';

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // Valid: private modifier
    {
      code: `
        class MyComponent {
          private featureConfigService = inject(FeatureConfigService);
        }
      `,
    },
    // Valid: private with readonly
    {
      code: `
        class MyComponent {
          private readonly featureConfigService = inject(FeatureConfigService);
        }
      `,
    },
    // Valid: private with different property name
    {
      code: `
        class MyComponent {
          private featureConfig = inject(FeatureConfigService);
        }
      `,
    },
    // Valid: private with Optional decorator
    {
      code: `
        class MyComponent {
          @Optional() private featureConfigService = inject(FeatureConfigService, { optional: true });
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
          featureConfigService = new FeatureConfigService();
        }
      `,
    },
  ],
  invalid: [
    // Invalid: no access modifier (implicit public)
    {
      code: `
        class MyComponent {
          featureConfigService = inject(FeatureConfigService);
        }
      `,
      output: `
        class MyComponent {
          private featureConfigService = inject(FeatureConfigService);
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
    // Invalid: protected modifier
    {
      code: `
        class MyComponent {
          protected featureConfigService = inject(FeatureConfigService);
        }
      `,
      output: `
        class MyComponent {
          private featureConfigService = inject(FeatureConfigService);
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
    // Invalid: public modifier
    {
      code: `
        class MyComponent {
          public featureConfigService = inject(FeatureConfigService);
        }
      `,
      output: `
        class MyComponent {
          private featureConfigService = inject(FeatureConfigService);
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
    // Invalid: readonly without private
    {
      code: `
        class MyComponent {
          readonly featureConfigService = inject(FeatureConfigService);
        }
      `,
      output: `
        class MyComponent {
          private readonly featureConfigService = inject(FeatureConfigService);
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
    // Invalid: with decorator but no private
    {
      code: `
        class MyComponent {
          @Optional() featureConfigService = inject(FeatureConfigService, { optional: true });
        }
      `,
      output: `
        class MyComponent {
          @Optional() private featureConfigService = inject(FeatureConfigService, { optional: true });
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
    // Invalid: different property name without private
    {
      code: `
        class MyComponent {
          featureConfig = inject(FeatureConfigService);
        }
      `,
      output: `
        class MyComponent {
          private featureConfig = inject(FeatureConfigService);
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
    // Invalid: protected with readonly
    {
      code: `
        class MyComponent {
          protected readonly featureConfigService = inject(FeatureConfigService);
        }
      `,
      output: `
        class MyComponent {
          private readonly featureConfigService = inject(FeatureConfigService);
        }
      `,
      errors: [{ messageId: 'featureConfigServiceMustBePrivate' }],
    },
  ],
});

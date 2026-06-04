/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as path from 'path';
import { RuleTester } from '@angular-eslint/test-utils';
import { rule, RULE_NAME } from './no-self-public-api-import';

const ruleTester = new RuleTester();

// File inside the mock library — nearest package.json has name "@spartacus/mock-lib"
const insideMockLib = path.join(
  __dirname,
  'fixtures',
  'mock-lib',
  'src',
  'test.ts'
);

// File outside any @spartacus library (root package.json name is "storefrontapp")
const outsideLib = path.join(__dirname, 'fixtures', 'file.ts');

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // relative import inside the library — always valid
    {
      code: `import { CartService } from '../services/cart.service';`,
      filename: insideMockLib,
    },
    // import from a DIFFERENT @spartacus library — valid
    {
      code: `import { OccConfig } from '@spartacus/core';`,
      filename: insideMockLib,
    },
    // @spartacus import but the file is not inside any @spartacus library
    {
      code: `import { CartService } from '@spartacus/cart';`,
      filename: outsideLib,
    },
  ],
  invalid: [
    // importing from own package's public API
    {
      code: `import { SomeService } from '@spartacus/mock-lib';`,
      filename: insideMockLib,
      errors: [{ messageId: 'noSelfPublicApiImport' }],
    },
    // importing from a sub-entry of own package
    {
      code: `import { SomeService } from '@spartacus/mock-lib/root';`,
      filename: insideMockLib,
      errors: [{ messageId: 'noSelfPublicApiImport' }],
    },
  ],
});

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuleTester } from '@angular-eslint/test-utils';
import * as path from 'path';
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

// File inside the mock library's own `base/root` entry point
const insideMockLibRoot = path.join(
  __dirname,
  'fixtures',
  'mock-lib',
  'base',
  'root',
  'test.ts'
);

// File inside a SIBLING secondary entry point (`base/core`) of the mock library
const insideMockLibCore = path.join(
  __dirname,
  'fixtures',
  'mock-lib',
  'base',
  'core',
  'test.ts'
);

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
    // `root` entry point of own library — valid (shared across entry points)
    {
      code: `import { SomeModule } from '@spartacus/mock-lib/root';`,
      filename: insideMockLib,
    },
    {
      code: `import { SomeModule } from '@spartacus/mock-lib/base/root';`,
      filename: insideMockLib,
    },
    // `root` entry point consumed from a SIBLING entry point (base/core) —
    // valid, this is the intended cross-entry-point sharing
    {
      code: `import { SomeModule } from '@spartacus/mock-lib/base/root';`,
      filename: insideMockLibCore,
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
      code: `import { SomeService } from '@spartacus/mock-lib/core';`,
      filename: insideMockLib,
      errors: [{ messageId: 'noSelfPublicApiImport' }],
    },
    // importing the `root` barrel from a file that lives INSIDE that same
    // `root` entry point — a self-barrel circular import, must be flagged
    {
      code: `import { SomeModule } from '@spartacus/mock-lib/base/root';`,
      filename: insideMockLibRoot,
      errors: [{ messageId: 'noSelfPublicApiImport' }],
    },
  ],
});

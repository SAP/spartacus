// SPARTACUS NOTE:
//
// This workaround should be removed as soon as Angular Schematics starts to support
// executing ES Modules and when we change in tsconfig.schematics.json to `"module": "es2015"` (or higher)
//
// See the Angular Schematics ticket: https://github.com/angular/angular-cli/issues/22786

/*
 * Copyright Google LLC All Rights Reserved.
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export async function loadEsmModule<T>(modulePath: string | URL): Promise<T> {
  const namespaceObject = await new Function(
    'modulePath',
    `return import(modulePath);`
  )(modulePath);

  // If it is not ESM then the values needed will be stored in the `default` property.
  // TODO_ESM: This can be removed once `@angular/*` packages are ESM only.
  if (namespaceObject.default) {
    return namespaceObject.default;
  } else {
    return namespaceObject;
  }
}

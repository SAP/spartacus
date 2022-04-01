// SPARTACUS NOTE:
//
// This workaround should be removed as soon as Angular Schematics starts to support
// executing ES Modules and when we change in tsconfig.schematics.json to `"module": "es2015"` (or higher)
//
// See the Angular Schematics ticket: https://github.com/angular/angular-cli/issues/22786

/**
 * @license
 * The MIT License
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * ----------------------------------------------------------------------------------------
 *
 * See original code: https://github.com/angular/angular/blob/e0015d3c456d584242269b0765878d598a550888/packages/core/schematics/utils/load_esm.ts#L11-L35
 *
 * --------------------------------------------------------------------------------
 * This uses a dynamic import to load a module which may be ESM.
 * CommonJS code can load ESM code via a dynamic import. Unfortunately, TypeScript
 * will currently, unconditionally downlevel dynamic import into a require call.
 * require calls cannot load ESM code and will result in a runtime error. To workaround
 * this, a Function constructor is used to prevent TypeScript from changing the dynamic import.
 * Once TypeScript provides support for keeping the dynamic import this workaround can
 * be dropped.
 * This is only intended to be used with Angular framework packages.
 *
 * @param modulePath The path of the module to load.
 * @returns A Promise that resolves to the dynamically imported module.
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

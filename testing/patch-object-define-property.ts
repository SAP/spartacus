/**
 * It's a hack to allow for spying on non-configurable properties of objects.
 * In particular, it allows to spy on simple functions imported from 3rd party libraries.
 *
 * This file should NOT be imported in the production code, but only in unit tests!
 *
 * It monkey-patches globally `Object.defineProperty` to avoid setting any object property as non-configurable.
 * Thanks to that, `spyOnProperty` can overwrite a getter of any object's property.
 *
 * Without this hack, an error would be thrown '<spyOnProperty> : isDevMode is not declared configurable' for
 * such a test code:
 * ```
 * import * as AngularCore from '@angular/core';
 * spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
 * ```
 *
 * It's needed since `zone.js@0.11.4`.
 * See https://github.com/angular/angular/commit/45a73dddfdf3f32ad4203c71c06b6a4be50f4a31
 */

const { defineProperty } = Object;
Object.defineProperty = (object, name, meta) => {
  if (meta.get && !meta.configurable) {
    return defineProperty(object, name, {
      ...meta,
      configurable: true,
    });
  }
  return defineProperty(object, name, meta);
};

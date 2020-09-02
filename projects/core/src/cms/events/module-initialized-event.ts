import { NgModuleRef } from '@angular/core';

/**
 * Will be thrown in case lazy loaded modules are loaded and instantiated.
 *
 * This event is thrown for cms driven lazy loaded feature modules amd it's
 * dependencies
 */
export class ModuleInitializedEvent {
  /**
   * Name of the feature associated with this module.
   *
   * You can differentiate between feature and dependency modules, as the latter
   * won't have thus property set.
   */
  featureName?: string;
  /**
   * Module reference fpr created ,pdi;e
   */
  moduleRef: NgModuleRef<any>;
}

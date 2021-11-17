import { NgModuleRef } from '@angular/core';
import { CxEvent } from '../../event/cx-event';

/**
 * Will be thrown in case lazy loaded modules are loaded and instantiated.
 *
 * This event is thrown for cms driven lazy loaded feature modules amd it's
 * dependencies
 */
export class ModuleInitializedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'ModuleInitializedEvent';
  /**
   * Name/identifier of the feature associated with this module.
   *
   * You can differentiate between feature and dependency modules, as the latter
   * won't have thus property set.
   */
  feature?: string;
  /**
   * Reference fpr lazy loaded module instance
   */
  moduleRef: NgModuleRef<any>;
}

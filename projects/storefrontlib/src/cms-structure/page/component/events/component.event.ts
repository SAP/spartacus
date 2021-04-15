import { ComponentRef } from '@angular/core';
import { CxEvent } from '@spartacus/core';

/**
 * Lifecycle events for the component.
 *
 * Triggers when the component is added or removed from the DOM.
 */
export abstract class ComponentEvent extends CxEvent {
  typeCode: string;
  id: string;
  componentRef: ComponentRef<any>;
}

/**
 * Indicates that the component is added to the DOM.
 */
export class ComponentCreateEvent extends ComponentEvent {
  /**
   * Event's type
   */
  static readonly type = 'ComponentCreate';
}

/**
 * Indicates that the component is removed from the DOM.
 */
export class ComponentDestroyEvent extends ComponentEvent {
  /**
   * Event's type
   */
  static readonly type = 'ComponentDestroy';
}

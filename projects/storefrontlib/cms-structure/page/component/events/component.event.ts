import { CxEvent } from '@spartacus/core';

/**
 * Lifecycle events for the creation and removal of CMS components.
 *
 * Triggers when the component is added or removed from the DOM, using
 * sub event `ComponentCreateEvent` and `ComponentDestroyEvent`.
 */
export abstract class ComponentEvent extends CxEvent {
  /**
   * The component type code.
   */
  typeCode: string;
  /**
   * The unique id for the component instance.
   */
  id: string;
}

/**
 * Indicates that the component is added to the DOM.
 */
export class ComponentCreateEvent extends ComponentEvent {
  /**
   * Event's type
   */
  static readonly type = 'ComponentCreate';
  /**
   * The component host element.
   */
  host: HTMLElement;
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

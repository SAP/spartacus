import { CartEvent } from '@spartacus/core';

/**
 * Base cart event. Most cart events should have these properties.
 */
export abstract class SavedCartEvent extends CartEvent {
  saveCartName: string;
  saveCartDescription: string;
}

// =====================================================================

export class DeleteSavedCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSavedCartEvent';
}

export class DeleteSavedCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSavedCartSuccessEvent';
}

export class DeleteSavedCartFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSavedCartFailEvent';
}

export class SaveCartEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'SaveCartEvent';
}

export class SaveCartSuccessEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'SaveCartSuccessEvent';
  saveTime: string;
}

export class RestoreSavedCartEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartEvent';
  saveTime: string;
}

export class RestoreSavedCartSuccessEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartSuccessEvent';
}

export class RestoreSavedCartFailEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartFailEvent';
  saveTime: string;
}

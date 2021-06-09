import { CartEvent } from '@spartacus/core';

/**
 * Base saved cart event. Most cart events should have these properties.
 */
export abstract class SavedCartEvent extends CartEvent {}

// =====================================================================

export class DeleteSavedCartEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSavedCartEvent';
}

export class DeleteSavedCartSuccessEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSavedCartSuccessEvent';
}

export class DeleteSavedCartFailEvent extends SavedCartEvent {
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
  saveCartName?: string;
  saveCartDescription?: string;
}

export class SaveCartSuccessEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'SaveCartSuccessEvent';
  saveCartName?: string;
  saveCartDescription?: string;
  saveTime: string;
}

export class SaveCartFailEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'SaveCartEvent';
  saveCartName?: string;
  saveCartDescription?: string;
}

export class RestoreSavedCartEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartEvent';
  saveCartName?: string;
  saveCartDescription?: string;
  saveTime: string;
}

export class RestoreSavedCartSuccessEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartSuccessEvent';
  saveCartName?: string;
  saveCartDescription?: string;
}

export class RestoreSavedCartFailEvent extends SavedCartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartFailEvent';
  saveCartName?: string;
  saveCartDescription?: string;
  saveTime: string;
}

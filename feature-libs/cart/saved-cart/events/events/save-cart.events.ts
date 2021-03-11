import { CartEvent } from '@spartacus/core';

export class DeleteSaveCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSaveCartEvent';
}

export class DeleteSaveCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSaveCartSuccessEvent';
}

export class DeleteSaveCartFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'DeleteSaveCartFailEvent';
}

export class SaveCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'SaveCartEvent';
  saveCartName: string;
  saveCartDescription: string;
}

export class SaveCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'SaveCartSuccessEvent';
  saveCartName: string;
  saveCartDescription: string;
  saveTime: string;
}

export class RestoreSavedCartEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartEvent';
}

export class RestoreSavedCartSuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartSuccessEvent';
}

export class RestoreSavedCartFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'RestoreSavedCartFailEvent';
}

import { InjectionToken } from '@angular/core';
import { PersistFocusConfig } from './keyboard-focus.model';

/** Token used to store the focused key */
export const KEYBOARD_FOCUS_TOKEN = new InjectionToken<PersistFocusConfig>(
  'cx-kft'
);

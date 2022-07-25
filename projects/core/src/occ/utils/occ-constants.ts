import { InjectionToken } from '@angular/core';

export const OCC_USER_ID_CURRENT = 'current';
export const OCC_USER_ID_ANONYMOUS = 'anonymous';
export const OCC_USER_ID_GUEST = 'guest';

export const OCC_CART_ID_CURRENT = 'current';

export const OCC_USER_ID_CONSTANTS = [
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_GUEST,
];

export const OCC_USER_ID_CONSTANTS_TOKEN = new InjectionToken<Array<string>>(
  'List of OCC constants that pass for user IDs.'
);

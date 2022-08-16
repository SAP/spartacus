import { InjectionToken } from '@angular/core';

import * as OCC_USER_IDS from './occ-user-ids';

export { OCC_USER_IDS };

export * from './interceptor-util';
export * from './occ-constants';
export * from './occ-url-util';
export * from './occ-asm-token';

export const OCC_USER_ID_CONSTANTS = new InjectionToken<{
  [identifier: string]: string;
}>('List of OCC constants that pass for user IDs.');

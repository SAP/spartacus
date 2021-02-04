import { InjectionToken } from '@angular/core';

export const MODULE_INITIALIZER: InjectionToken<
  (() => any)[]
> = new InjectionToken<(() => any)[]>('MODULE_INITIALIZER');

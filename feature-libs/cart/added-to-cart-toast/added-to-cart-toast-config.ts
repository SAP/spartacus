import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CartToastConfig extends OccConfig {
  cartToast?: {
    timeout?: number;
    enabled?: boolean;
  };
}

declare module '@spartacus/core' {
  interface Config extends CartToastConfig {}
}

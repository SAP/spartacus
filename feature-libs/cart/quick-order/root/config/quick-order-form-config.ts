import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QuickOrderFormConfig {
  quickOrderForm?: {
    displayProductImages: boolean;
    maxProducts: number;
    minCharactersBeforeRequest: number;
  };
}

declare module '@spartacus/core' {
  interface Config extends QuickOrderFormConfig {}
}

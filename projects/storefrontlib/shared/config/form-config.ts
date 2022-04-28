import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class FormConfig {
  form?: {
    togglePasswordVisibility: boolean;
  };
}

declare module '@spartacus/core' {
  interface Config extends FormConfig {}
}

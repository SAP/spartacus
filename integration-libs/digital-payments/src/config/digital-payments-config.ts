import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class DigitalPaymentsConfig {
  digitalPayments?: {
    baseSite: string;
    javascriptUrl: string;
    sessionExpiration: number;
  }[];
}

declare module '@spartacus/core' {
  interface Config extends DigitalPaymentsConfig {}
}

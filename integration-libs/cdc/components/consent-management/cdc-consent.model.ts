import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CdcConsentTemplate {
    documentUrl?: string;
    required?: Boolean;
}

declare module '@spartacus/core' {
  interface  ConsentTemplate extends CdcConsentTemplate {}
}

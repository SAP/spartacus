import { Provider } from '@angular/core';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import { I18nextHttpBackendInitializer } from './i18next-http-backend.initializer';

export const i18nextBackendProviders: Provider[] = [
  {
    provide: I18nextBackendInitializer,
    useExisting: I18nextHttpBackendInitializer,
    multi: true,
  },
];

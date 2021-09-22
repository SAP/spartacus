import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OnNavigateConfig {
  enableResetViewOnNavigate?: {
    active?: boolean;
    disableOnQueryParam?: string[];
    disableOnSpecificRoutes?: string[];
  };
}

declare module '@spartacus/core' {
  interface Config extends OnNavigateConfig {}
}

import { Currency } from '@spartacus/core';

declare module '@spartacus/core' {
  interface CostCenter {
    activeFlag?: boolean;
    currency?: Currency;
    originalCode?: string; // TODO: validate the need of this
  }
}

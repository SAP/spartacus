import { Type } from '@angular/core';
import { AsmCustomer360Type } from '@spartacus/asm/root';

import { Customer360SectionConfig } from './customer-360-section-config';

export abstract class AsmCustomer360TabConfig {
  components: Array<{
    component: Type<any>;
    /** Necessary for fetching the right information from the backend. TODO: May be optional for OCC. */
    customer360Type: AsmCustomer360Type;
    config?: Customer360SectionConfig;
  }>;
  i18nNameKey: string;
}

import { Type } from '@angular/core';
import { AsmCustomer360Query } from '@spartacus/asm/root';

import { Customer360SectionConfig } from './customer-360-section-config';

export abstract class AsmCustomer360TabConfig {
  components: Array<{
    component: Type<any>;
    /** Data that can be associated to a component used to fetch information from a backend. */
    requestData?: AsmCustomer360Query;
    config?: Customer360SectionConfig;
  }>;
  i18nNameKey: string;
}

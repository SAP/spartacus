import { Type } from '@angular/core';

import { Customer360SectionConfig } from './customer-360-section-config';

export abstract class AsmCustomer360TabConfig {
  components: Array<{
    component: Type<any>;
    config?: Customer360SectionConfig;
  }>;
  /** TODO: These need to be translation keys. */
  name: string;
}

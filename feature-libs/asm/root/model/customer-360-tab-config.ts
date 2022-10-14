import { AsmCustomer360Query } from './asm-360.model';
import { Customer360SectionConfig } from './customer-360-section-config';

export abstract class AsmCustomer360TabConfig {
  components: Array<{
    component: string;
    /** Data that can be associated to a component used to fetch information from a backend. */
    requestData?: AsmCustomer360Query;
    config?: Customer360SectionConfig;
  }>;
  i18nNameKey: string;
}

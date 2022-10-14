import { Customer360SectionConfig } from './customer-360-section-config';

export interface AsmCustomer360TabComponent<AsmCustomer360RequestData> {
  component: string;
  /** Data that can be associated to a component used to fetch information from a backend. */
  requestData?: AsmCustomer360RequestData;
  config?: Customer360SectionConfig;
}

export abstract class AsmCustomer360TabConfig<AsmCustomer360RequestData> {
  components: Array<AsmCustomer360TabComponent<AsmCustomer360RequestData>>;
  i18nNameKey: string;
}

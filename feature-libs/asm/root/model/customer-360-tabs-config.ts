import { AsmCustomer360TabConfig } from './customer-360-tab-config';

export abstract class AsmCustomer360TabsConfig<AsmCustomer360RequestData> {
  tabs?: Array<AsmCustomer360TabConfig<AsmCustomer360RequestData>>;
}

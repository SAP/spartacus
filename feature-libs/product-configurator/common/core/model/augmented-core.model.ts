import { ConfigurationInfo, StatusSummary } from './common-configurator.model';
declare module '@spartacus/core' {
  interface Product {
    configurable?: boolean;
    configuratorType?: string;
  }
  interface OrderEntry {
    statusSummaryList?: StatusSummary[];
    configurationInfos?: ConfigurationInfo[];
  }
}

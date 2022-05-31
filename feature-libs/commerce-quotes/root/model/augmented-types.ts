import '@spartacus/checkout/base/root';
import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import { Comment } from './commerce-quotes.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    comments?: Comment[];
    configurationInfos?: ConfigurationInfo[];
  }
}

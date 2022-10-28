import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import '@spartacus/storefront';

import { Comment } from './commerce-quotes.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    comments?: Comment[];
    configurationInfos?: ConfigurationInfo[];
  }
}

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    REQUEST_QUOTE = 'REQUEST_QUOTE',
  }
}

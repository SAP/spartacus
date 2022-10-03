import { AsmCustomer360Type } from '@spartacus/asm/root';
import {
  AsmCustomerMapComponent,
  AsmCustomerProductReviewsComponent,
} from '../../components/asm-customer-360/sections/components';
import { AsmConfig } from './asm-config';

export const defaultAsmConfig: AsmConfig = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 600,
    },
    customerSearch: {
      maxResults: 20,
    },
    customer360: {
      tabs: [
        {
          i18nNameKey: 'asm.customer360.feedbackTab',
          components: [
            {
              component: AsmCustomerProductReviewsComponent,
              customer360Type: AsmCustomer360Type.REVIEW_LIST,
              config: { pageSize: 5 },
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.mapsTab',
          components: [
            {
              component: AsmCustomerMapComponent,
              customer360Type: AsmCustomer360Type.STORE_LOCATION,
              config: {
                googleMapsApiKey: 'AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8',
                pageSize: 10,
              },
            },
          ],
        },
      ],
    },
  },
};

import {
  AsmCustomerMapComponent,
  AsmCustomerOverviewComponent,
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
          i18nNameKey: 'asm.customer360.overviewTab',
          components: [
            {
              component: AsmCustomerOverviewComponent,
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.overviewTab',
          components: [
            {
              component: AsmCustomerProductReviewsComponent,
              requestData: {
                customer360Type: 'C360ReviewList',
              },
              config: { pageSize: 5 },
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.mapsTab',
          components: [
            {
              component: AsmCustomerMapComponent,
              requestData: {
                customer360Type: 'C360StoreLocation',
              },
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

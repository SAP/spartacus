import {
  AsmCustomerActivityComponent,
  AsmCustomerMapComponent,
  AsmCustomerOverviewComponent,
  AsmCustomerProductReviewsComponent,
  AsmCustomerProfileComponent,
  AsmCustomerSupportTicketsComponent,
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
          i18nNameKey: 'asm.customer360.overview.tabName',
          components: [
            {
              component: AsmCustomerOverviewComponent,
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.profile.tabName',
          components: [
            {
              component: AsmCustomerProfileComponent,
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.activity.tabName',
          components: [
            {
              component: AsmCustomerActivityComponent,
              config: { pageSize: 10 },
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.feedback.tabName',
          components: [
            {
              component: AsmCustomerSupportTicketsComponent,
              config: { pageSize: 5 },
            },
            {
              component: AsmCustomerProductReviewsComponent,
              config: { pageSize: 5 },
            },
          ],
        },
        {
          i18nNameKey: 'asm.customer360.maps.tabName',
          components: [
            {
              component: AsmCustomerMapComponent,
              config: {
                googleMapsApiKey: 'AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8',
                pageSize: 10,
              },
            },
          ],
        },
      ],
      activityTab: {
        pageSize: 10,
      },
      feedbackTab: {
        supportTickets: {
          pageSize: 5,
        },
        productReviews: {
          pageSize: 5,
        },
      },
      mapsTab: {
        googleMaps: {
          apiKey: 'AIzaSyAEwnpFNr0duKCE0DClFE7RRJJ9zUmJ8u8',
        },
        pageSize: 10,
      },
    },
  },
};

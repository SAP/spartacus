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
          name: 'Overview',
          components: [
            {
              component: AsmCustomerOverviewComponent,
            },
          ],
        },
        {
          name: 'Profile',
          components: [
            {
              component: AsmCustomerProfileComponent,
            },
          ],
        },
        {
          name: 'Activity',
          components: [
            {
              component: AsmCustomerActivityComponent,
              config: { pageSize: 10 },
            },
          ],
        },
        {
          name: 'Feedback',
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
          name: 'Maps',
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

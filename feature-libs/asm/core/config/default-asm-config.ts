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

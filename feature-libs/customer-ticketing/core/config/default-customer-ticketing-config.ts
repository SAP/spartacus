import { CustomerTicketingConfig } from './customer-ticketing-config';

export const defaultCustomerTicketingConfig: CustomerTicketingConfig = {
  customerTicketing: {
    attachmentValidity: {
      maxSize: 1,
      maxEntries: 1,
      allowedTypes: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv',
        '.csv',
        '.doc',
        '.docx',
        '.pdf',
      ],
    },
  },
};

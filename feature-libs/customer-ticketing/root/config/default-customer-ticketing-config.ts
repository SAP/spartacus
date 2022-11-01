import {
  MAX_ENTRIES_FOR_ATTACHMENT,
  MAX_INPUT_CHARACTERS,
  MAX_INPUT_CHARACTERS_FOR_SUBJECT,
  MAX_SIZE_FOR_ATTACHMENT,
} from '../customer-ticketing-constants';
import { CustomerTicketingConfig } from './customer-ticketing-config';

export const defaultCustomerTicketingConfig: CustomerTicketingConfig = {
  customerTicketing: {
    attachmentRestrictions: {
      maxSize: MAX_SIZE_FOR_ATTACHMENT,
      maxEntries: MAX_ENTRIES_FOR_ATTACHMENT,
      allowedTypes: [
        '.pdf',
        '.txt',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.doc',
        '.docx',
        '.html',
        '.htm',
        '.zip',
      ],
    },
    inputCharactersLimit: MAX_INPUT_CHARACTERS,
    inputCharactersLimitForSubject: MAX_INPUT_CHARACTERS_FOR_SUBJECT,
  },
};

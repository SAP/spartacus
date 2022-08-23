import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingDialogComponent } from './customer-ticketing-dialog.component';

export const defaultCustomerTicketingFormLayoutConfig: LayoutConfig = {
  launch: {
    CUSTOMER_TICKETING: {
      inline: true,
      component: CustomerTicketingDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

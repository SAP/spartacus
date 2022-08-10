import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog.component';

export const defaultCustomerTicketingCreateFormLayoutConfig: LayoutConfig = {
  launch: {
    CUSTOMER_TICKETING_CREATE: {
      inline: true,
      component: CustomerTicketingCreateDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

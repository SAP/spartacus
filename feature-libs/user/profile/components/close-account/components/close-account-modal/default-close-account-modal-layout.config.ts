import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { CloseAccountModalComponent } from './close-account-modal.component';

export const defaultCloseDialogModalLayoutConfig: LayoutConfig = {
  launch: {
    CLOSE_ACCOUNT: {
      inline: true,
      component: CloseAccountModalComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

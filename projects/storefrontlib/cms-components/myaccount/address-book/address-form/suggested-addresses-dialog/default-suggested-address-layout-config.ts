import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';

export const defaultSuggestedAddressLayoutConfig: LayoutConfig = {
  launch: {
    SUGGESTED_ADDRESS: {
      inline: true,
      component: SuggestedAddressDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

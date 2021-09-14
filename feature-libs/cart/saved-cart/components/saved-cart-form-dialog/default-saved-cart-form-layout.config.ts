import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SavedCartFormDialogComponent } from './saved-cart-form-dialog.component';

export const defaultSavedCartFormLayoutConfig: LayoutConfig = {
  launch: {
    SAVED_CART: {
      global: true,
      component: SavedCartFormDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

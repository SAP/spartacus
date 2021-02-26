import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SavedCartFormComponent } from './saved-cart-form.component';

export const savedCartFormConfig: LayoutConfig = {
  launch: {
    ADD_TO_SAVED_CART: {
      inline: true,
      component: SavedCartFormComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
};

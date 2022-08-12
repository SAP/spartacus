import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { AddedToCartDialogComponent } from '.';

export const defaultAddedToCartConfig: LayoutConfig = {
  launch: {
    ADDED_TO_CART: {
      inline: true,
      component: AddedToCartDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

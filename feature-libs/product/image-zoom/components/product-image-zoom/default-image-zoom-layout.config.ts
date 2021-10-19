import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ImageZoomDialogComponent } from './image-zoom-dialog/image-zoom-dialog.component';

export const defaultProductImageZoomLayoutConfig: LayoutConfig = {
  launch: {
    PRODUCT_IMAGE_ZOOM: {
      inline: true,
      component: ImageZoomDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

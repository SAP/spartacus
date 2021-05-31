import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { ImageZoomDialogComponent } from './dialog/image-zoom-dialog.component';

export const defaultImageZoomLayoutConfig: LayoutConfig = {
  launch: {
    IMAGE_ZOOM: {
      inline: true,
      component: ImageZoomDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

import { LayoutConfig } from '../../../layout/config/layout-config';
import { DIALOG_TYPE } from '../../../layout/launch-dialog/index';
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

import { DIALOG_TYPE, LayoutConfig } from '../../../../../layout/index';
import {SuggestedAddressDialogComponent} from './suggested-addresses-dialog.component';


export const defaultSuggestedAddressDialogConfig: LayoutConfig = {
  launch: {
    SUGGESTED_ADDRESS: {
      inlineRoot: true,
      component: SuggestedAddressDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

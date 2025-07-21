import { DIALOG_TYPE, LAUNCH_CALLER, LayoutConfig } from "@spartacus/storefront";
import { ExtendSubscriptionDialog } from "./details/extend-subscription/extend-subscription-dialog.component";


export const defaultSubscriptionBillingLayoutConfig: LayoutConfig = {
  launch: {
    [LAUNCH_CALLER.EXTEND_SUBSCRIPTION]: {
        inlineRoot: true, 
        component: ExtendSubscriptionDialog,
        dialogType: DIALOG_TYPE.DIALOG
    }
  },
};
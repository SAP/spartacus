import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { AnonymousConsentDialogComponent } from './anonymous-consent-dialog.component';

export const defaultAnonymousConsentLayoutConfig: LayoutConfig = {
  launch: {
    ANONYMOUS_CONSENT: {
      inline: true,
      component: AnonymousConsentDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

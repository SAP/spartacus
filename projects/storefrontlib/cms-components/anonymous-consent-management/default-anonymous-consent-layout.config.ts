import { LayoutConfig } from '../../layout/config/layout-config';
import { DIALOG_TYPE } from '../../layout/launch-dialog/index';
import { AnonymousConsentDialogComponent } from '../../shared/components/anonymous-consents-dialog/anonymous-consent-dialog.component';

export const defaultAnonymousConsentLayoutConfig: LayoutConfig = {
  launch: {
    ANONYMOUS_CONSENT: {
      inline: true,
      component: AnonymousConsentDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};

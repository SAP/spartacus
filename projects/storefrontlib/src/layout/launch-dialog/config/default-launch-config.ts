import { AsmMainUiComponent } from '../../../cms-components/asm/asm-main-ui/asm-main-ui.component';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { SkipLinkComponent } from '../../a11y/skip-link/component/skip-link.component';
import { DIALOG_TYPE, LaunchConfig } from './launch-config';

export const DEFAULT_LAUNCH_CONFIG: LaunchConfig = {
  launch: {
    ASM: {
      outlet: 'cx-storefront',
      component: AsmMainUiComponent,
    },
    SKIP_LINKS: {
      outlet: 'cx-storefront',
      component: SkipLinkComponent,
    },
    ANONYMOUS_CONSENT: {
      inline: true,
      component: AnonymousConsentDialogComponent,
      options: {
        dialogType: DIALOG_TYPE.DIALOG,
      },
    },
  },
};

import { AsmMainUiComponent } from '../../../cms-components/asm/asm-main-ui/asm-main-ui.component';
import { SkipLinkComponent } from '../../a11y/skip-link/component/skip-link.component';
import { LaunchConfig } from './launch-config';

export const DEFAULT_TRIGGER_CONFIG: LaunchConfig = {
  trigger: {
    ASM: {
      outlet: 'cx-storefront',
      component: AsmMainUiComponent,
    },
    SKIP_LINKS: {
      outlet: 'cx-storefront',
      component: SkipLinkComponent,
    },
  },
};

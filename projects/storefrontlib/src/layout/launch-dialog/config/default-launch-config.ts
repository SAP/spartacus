import { AsmMainUiComponent } from '../../../cms-components/asm/asm-main-ui/asm-main-ui.component';
import { SkipLinkComponent } from '../../a11y/skip-link/component/skip-link.component';
import { LaunchConfig } from './launch-config';

export const DEFAULT_LAUNCH_CONFIG: LaunchConfig = {
  launch: {
    ASM: {
      default: {
        outlet: 'cx-storefront',
        component: AsmMainUiComponent,
      },
    },
    SKIP_LINKS: {
      default: {
        outlet: 'cx-storefront',
        component: SkipLinkComponent,
      },
    },
  },
};

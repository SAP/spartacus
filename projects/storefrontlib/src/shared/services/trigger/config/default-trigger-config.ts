import { AsmMainUiComponent } from '../../../../cms-components/asm/asm-main-ui/asm-main-ui.component';
import { SkipLinkComponent } from '../../../../layout/a11y/skip-link/component/skip-link.component';
import { TriggerConfig } from './trigger-config';

export const DEFAULT_TRIGGER_CONFIG: TriggerConfig = {
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

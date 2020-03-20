import { AsmMainUiComponent } from '../../../../cms-components/asm/asm-main-ui/asm-main-ui.component';
import { SkipLinkComponent } from '../../../../layout/a11y/skip-link/component/skip-link.component';
import { TriggerConfig, TRIGGER_CALLER } from './trigger-config';

export const DEFAULT_TRIGGER_CONFIG: TriggerConfig = {
  trigger: {
    [TRIGGER_CALLER.ASM]: {
      outlet: 'cx-storefront',
      component: AsmMainUiComponent,
    },
    [TRIGGER_CALLER.SKIP_LINKS]: {
      outlet: 'cx-storefront',
      component: SkipLinkComponent,
    },
  },
};

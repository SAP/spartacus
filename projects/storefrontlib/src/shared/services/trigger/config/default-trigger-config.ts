import { AsmMainUiComponent } from '../../../../cms-components/asm/index';
import { SkipLinkComponent } from '../../../../layout/index';
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

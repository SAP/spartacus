import { TriggerConfig, TRIGGER_CALLER } from './trigger-config';

export const DEFAULT_TRIGGER_CONFIG: TriggerConfig = {
  trigger: {
    [TRIGGER_CALLER.ASM]: {
      outlet: 'cx-storefront',
    },
    [TRIGGER_CALLER.SKIP_LINKS]: {
      outlet: 'cx-storefront',
    },
  },
};

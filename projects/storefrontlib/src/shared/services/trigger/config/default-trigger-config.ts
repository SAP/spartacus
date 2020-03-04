import { TriggerConfig } from './trigger-config';
import { OutletPosition } from 'projects/storefrontlib/src/cms-structure';

export const DEFAULT_TRIGGER_CONFIG: TriggerConfig = {
  trigger: {
    asm: {
      outlet: 'cx-storefront',
      position: OutletPosition.BEFORE,
    },
    skipLinks: {
      outlet: 'cx-storefront',
      position: OutletPosition.BEFORE,
    },
  },
};

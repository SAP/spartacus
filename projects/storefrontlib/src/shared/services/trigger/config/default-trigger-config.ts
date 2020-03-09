import { TriggerConfig } from './trigger-config';
import { OutletPosition } from '../../../../cms-structure/outlet/index';

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

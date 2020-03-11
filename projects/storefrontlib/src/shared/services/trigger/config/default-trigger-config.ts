import { TriggerConfig } from './trigger-config';
import { OutletPosition } from '../../../../cms-structure/outlet/index';

export const DEFAULT_TRIGGER_CONFIG: TriggerConfig = {
  trigger: {
    ASM: {
      outlet: 'cx-storefront',
      position: OutletPosition.BEFORE,
    },
    SKIP_LINKS: {
      outlet: 'cx-storefront',
      position: OutletPosition.BEFORE,
    },
  },
};

import { OutletPosition } from '../../../../cms-structure/index';

export abstract class TriggerConfig {
  trigger?: {
    [TRIGGER_CALLER: string]:
      | TriggerOutletMapping
      | TriggerInlineMapping
      | TriggerUrlMapping;
  };
}

export interface TriggerOutletMapping {
  outlet: string;
  position?: OutletPosition;
}

export interface TriggerInlineMapping {
  inline: boolean;
  position?: OutletPosition;
}

export interface TriggerUrlMapping {
  url: string;
}

export enum TRIGGER_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
}

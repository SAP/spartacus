import { OutletPosition } from '../../../../cms-structure/index';

export abstract class TriggerConfig {
  trigger?: {
    asm?: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping;
    skipLinks?: TriggerOutletMapping | TriggerInlineMapping | TriggerUrlMapping;
  };
}

export interface TriggerOutletMapping {
  outlet: string;
  position: OutletPosition;
}

export interface TriggerInlineMapping {
  inline: boolean;
  position: OutletPosition;
}

export interface TriggerUrlMapping {
  url: string;
}

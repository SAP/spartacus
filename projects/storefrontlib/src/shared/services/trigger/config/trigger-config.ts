import { OutletPosition } from '../../../../cms-structure/index';

export abstract class TriggerConfig {
  trigger?: {
    [TRIGGER_CALLER: string]:
      | TriggerOutletMapping
      | TriggerInlineMapping
      | TriggerUrlMapping;
  };
}

export interface TriggerMapping {
  // Default: OutletPosition.BEFORE
  position?: OutletPosition;
  // Can the element be rendered multiple times
  multi?: boolean;
}

export interface TriggerOutletMapping extends TriggerMapping {
  outlet: string;
}

export interface TriggerInlineMapping extends TriggerMapping {
  inline: boolean;
}

export interface TriggerUrlMapping {
  url: string;
}

export enum TRIGGER_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
}

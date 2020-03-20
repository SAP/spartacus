import { OutletPosition } from '../../../../cms-structure/outlet/outlet.model';

export abstract class TriggerConfig {
  trigger?: {
    [TRIGGER_CALLER: string]:
      | TriggerOutletMapping
      | TriggerInlineMapping
      | TriggerUrlMapping;
  };
}

export interface TriggerMapping {
  component: any;
  // Can the element be rendered multiple times
  multi?: boolean;
  // Optional elements
  options?: any;
}

export interface TriggerOutletMapping extends TriggerMapping {
  outlet: string;
  // Default: OutletPosition.BEFORE
  position?: OutletPosition;
}

export interface TriggerInlineMapping extends TriggerMapping {
  inline: boolean;
}

export interface TriggerUrlMapping {
  cxRoute: string;
  params?: { [param: string]: any };
}

export enum TRIGGER_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
}

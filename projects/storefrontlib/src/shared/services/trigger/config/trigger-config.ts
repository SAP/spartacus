import { OutletPosition } from '../../../../cms-structure/outlet/outlet.model';

export abstract class TriggerConfig {
  trigger?: {
    [key in TRIGGER_CALLER]:
      | TriggerOutletMapping
      | TriggerInlineMapping
      | TriggerUrlMapping;
  };
}
/**
 * Parent type for configurations that render components
 */
export interface TriggerRenderMapping {
  component: any;
  // Can the element be rendered multiple times
  multi?: boolean;
  // Optional elements
  options?: {
    // Dialog type is used to apply CSS classes
    dialogType?: DIALOG_TYPE;
  };
}

/**
 * Configuration type to render a component in an outlet
 */
export interface TriggerOutletMapping extends TriggerRenderMapping {
  outlet: string;
  // Default: OutletPosition.BEFORE
  position?: OutletPosition;
}

/**
 * Configuration type to render a component inline (next to the trigger)
 */
export interface TriggerInlineMapping extends TriggerRenderMapping {
  inline: boolean;
}

/**
 * Configuration type to render as link
 */
export interface TriggerUrlMapping {
  cxRoute: string;
  params?: { [param: string]: any };
}

export enum DIALOG_TYPE {
  POPOVER = 'POPOVER',
  DIALOG = 'DIALOG',
  SIDEBAR_LEFT = 'SIDEBAR_LEFT',
  SIDEBAR_RIGHT = 'SIDEBAR_RIGHT',
}

export enum TRIGGER_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
}

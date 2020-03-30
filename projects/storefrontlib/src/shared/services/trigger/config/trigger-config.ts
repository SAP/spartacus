import { OutletPosition } from '../../../../cms-structure/outlet/outlet.model';

export abstract class TriggerConfig {
  trigger?: {
    [key: string]: TriggerRenderStrategy;
  };
}

export type TriggerRenderStrategy =
  | TriggerOutletMapping
  | TriggerInlineMapping
  | TriggerUrlMapping;

/**
 * Parent type for configurations that render components
 */
export interface TriggerRenderMapping {
  component: any;
  /**
   * Can the element be rendered multiple times
   */
  multi?: boolean;
  /**
   * Optional elements for other configurations
   */
  options?: {
    /**
     * Dialog type is used to apply CSS classes
     */
    dialogType?: DIALOG_TYPE;
  };
}

/**
 * Configuration type to render a component in an outlet
 */
export interface TriggerOutletMapping extends TriggerRenderMapping {
  /**
   * The outlet to render the element in
   */
  outlet: string;
  /**
   * Default: OutletPosition.BEFORE
   */
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
  /**
   * The route for the url
   */
  cxRoute: string;
  /**
   * The parameters for the route
   */
  params?: { [param: string]: any };
}

/**
 * Types of dialog openings supported
 */
export enum DIALOG_TYPE {
  POPOVER = 'POPOVER',
  DIALOG = 'DIALOG',
  SIDEBAR_START = 'SIDEBAR_START',
  SIDEBAR_END = 'SIDEBAR_END',
}

/**
 * List of available callers
 */
export enum TRIGGER_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
}

import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';

export interface LaunchConfig {
  [key: string]: LaunchOptions;
}

export type LaunchOptions =
  | LaunchOutletDialog
  | LaunchInlineDialog
  | LaunchRoute;

/**
 * Parent type for configurations that render components
 */
export interface LaunchDialog {
  component: any;
  /**
   * Can the element be rendered multiple times
   */
  multi?: boolean;
  /**
   * Dialog type is used to apply CSS classes
   */
  dialogType?: DIALOG_TYPE;
}

/**
 * Configuration type to render a component in an outlet
 */
export interface LaunchOutletDialog extends LaunchDialog {
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
export interface LaunchInlineDialog extends LaunchDialog {
  inline: boolean;
}

/**
 * Configuration type to render as link
 */
export interface LaunchRoute {
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
export enum LAUNCH_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
  ANONYMOUS_CONSENT = 'ANONYMOUS_CONSENT',
  REPLENISHMENT_ORDER = 'REPLENISHMENT_ORDER',
}

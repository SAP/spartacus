import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';

export interface LaunchConfig {
  [key: string]: LaunchOptions;
}

export type LaunchOptions =
  | LaunchOutletDialog
  | LaunchInlineDialog
  | LaunchRoute
  | LaunchInlineRootDialog;

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
 * Configuration type to render a component in an outlet.
 * Outlet rendering should only be used for elements that open once and do not close.
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
 * Configuration type to render a component directly inside the cx-storefront (storefront selector).
 * Best used for global elements like dialogs.
 */
export interface LaunchInlineRootDialog extends LaunchDialog {
  inlineRoot: boolean;
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
  POPOVER_CENTER = 'POPOVER_CENTER',
  POPOVER_CENTER_BACKDROP = 'POPOVER_CENTER_BACKDROP',
  DIALOG = 'DIALOG',
  SIDEBAR_START = 'SIDEBAR_START',
  SIDEBAR_END = 'SIDEBAR_END',
}

/**
 * List of available callers
 */
export const enum LAUNCH_CALLER {
  ASM = 'ASM',
  SKIP_LINKS = 'SKIP_LINKS',
  ANONYMOUS_CONSENT = 'ANONYMOUS_CONSENT',
  REPLENISHMENT_ORDER = 'REPLENISHMENT_ORDER',
  PLACE_ORDER_SPINNER = 'PLACE_ORDER_SPINNER',
  CLEAR_CART = 'CLEAR_CART',
}

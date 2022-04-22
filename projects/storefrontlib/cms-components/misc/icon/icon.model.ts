import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';

export enum ICON_TYPE {
  STAR = 'STAR',
  SEARCH = 'SEARCH',
  CART = 'CART',
  INFO = 'INFO',
  GRID = 'GRID',
  LIST = 'LIST',
  CARET_DOWN = 'CARET_DOWN',
  CARET_UP = 'CARET_UP',
  CARET_LEFT = 'CARET_LEFT',
  CARET_RIGHT = 'CARET_RIGHT',
  CLOSE = 'CLOSE',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  VISA = 'VISA',
  MASTER_CARD = 'MASTER_CARD',
  AMEX = 'AMEX',
  DINERS_CLUB = 'DINERS_CLUB',
  CREDIT_CARD = 'CREDIT_CARD',
  EXPAND = 'EXPAND',
  COLLAPSE = 'COLLAPSE',
  RESET = 'RESET',
  CIRCLE = 'CIRCLE',
  HEART = 'HEART',
  EMPTY_HEART = 'EMPTY_HEART',
  FILTER = 'FILTER',
  PENCIL = 'PENCIL',
  CLOCK = 'CLOCK',
  TRASH = 'TRASH',
  ACTIVE = 'ACTIVE',
  SORT_DOWN = 'SORT_DOWN',
  SORT = 'SORT',
  ON = 'ON',
  OFF = 'OFF',
  LINK_OUT = 'LINK_OUT',
  EXPAND_ARROWS = 'EXPAND_ARROWS',
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class IconConfig {
  icon?: IconOptions;
}

declare module '@spartacus/core' {
  interface Config extends IconConfig {}
}

export interface IconOptions {
  /**
   * Each icon type can be configured with a so-called symbol. The symbol will
   * be used to map the icon to an SVG `symbol` (id) or to the style classes of
   * a font based icon. The following configuration would map to a fontawesome
   * icon:
   *
   * icon: {
   *   symbols: {
   *     CART: 'fas fa-shopping-cart'
   *   }
   * }
   */
  symbols?: {
    [ICON_TYPE: string]: string;
  };

  /**
   * Resources are used to map icon types to certain asset, such as an SVG (sprite) image.
   * The resource type (`IconResourceType`) dictates whether an SVG image is used. The URL
   * is used for the SVG xlink reference.
   */
  resources?: IconConfigResource[];

  /**
   * Lists icons that should be flipped for a specific direction.
   */
  flipDirection?: {
    [ICON_TYPE: string]: DirectionMode;
  };
}

export interface IconConfigResource {
  type: IconResourceType | string;
  url?: string;
  types?: (ICON_TYPE | string)[];
}

/**
 * Each ICON type can have an companied resource type, such as SVG, LINK (font) or just TEXT.
 * The resources will be automatically loaded in case they're required for the `ICON_TYPE`.
 */
export enum IconResourceType {
  /**
   * An svg based icon requires an SVG resource that must be loaded,
   * this is typically a sprite svg file.
   */
  SVG = 'svg',

  /**
   * A font based ICON might require an additional CSS file to be loaded.
   */
  LINK = 'link',
  /**
   * Text based icons will simply add the ICON string to the DOM. Text icons do not need an image
   * or CSS pseudo class (i.e. :before), as the text itself is the icon (i.e. +)
   */
  TEXT = 'text',
}

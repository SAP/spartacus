/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';

export enum ICON_TYPE {
  ACTIVE = 'ACTIVE',
  ADDRESS_BOOK = 'ADDRESS_BOOK',
  AMEX = 'AMEX',
  CARET_DOWN = 'CARET_DOWN',
  CARET_LEFT = 'CARET_LEFT',
  CARET_RIGHT = 'CARET_RIGHT',
  CARET_UP = 'CARET_UP',
  CART = 'CART',
  CART_PLUS = 'CART_PLUS',
  CART_ARROW_DOWN = 'CART_ARROW_DOWN',
  CHECK = 'CHECK',
  CIRCLE = 'CIRCLE',
  CLIPBOARD_LIST = 'CLIPBOARD_LIST',
  CLOCK = 'CLOCK',
  CLOSE = 'CLOSE',
  COLLAPSE = 'COLLAPSE',
  CREDIT_CARD = 'CREDIT_CARD',
  DINERS_CLUB = 'DINERS_CLUB',
  DOWNLOAD = 'DOWNLOAD',
  EMPTY_HEART = 'EMPTY_HEART',
  ERROR = 'ERROR',
  EXPAND = 'EXPAND',
  EXPAND_ARROWS = 'EXPAND_ARROWS',
  EYE = 'EYE',
  EYE_SLASH = 'EYE_SLASH',
  FILE = 'FILE',
  FILTER = 'FILTER',
  GRID = 'GRID',
  HEART = 'HEART',
  INFO = 'INFO',
  LINK_OUT = 'LINK_OUT',
  LIST = 'LIST',
  MASTER_CARD = 'MASTER_CARD',
  OFF = 'OFF',
  ON = 'ON',
  ORDER = 'ORDER',
  PENCIL = 'PENCIL',
  RESET = 'RESET',
  REPEAT = 'REPEAT',
  SEARCH = 'SEARCH',
  SORT = 'SORT',
  SORT_AMOUNT_DOWN = 'SORT_AMOUNT_DOWN',
  SORT_AMOUNT_UP = 'SORT_AMOUNT_UP',
  SORT_DOWN = 'SORT_DOWN',
  STAR = 'STAR',
  SUCCESS = 'SUCCESS',
  TRASH = 'TRASH',
  USER_FRIENDS = 'USER_FRIENDS',
  VISA = 'VISA',
  WARNING = 'WARNING',
  HEADSET = 'HEADSET',
  ATTACHMENT = 'ATTACHMENT',
  UPLOAD = 'UPLOAD',
  USER = 'USER',
  USER_PLUS = 'USER_PLUS',
  ARROW_LEFT = 'ARROW_LEFT',
  ARROW_RIGHT = 'ARROW_RIGHT',
  ARROW_DOWN = 'ARROW_DOWN',
  ARROW_UP = 'ARROW_UP',
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

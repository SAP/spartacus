export enum ICON_TYPE {
  STAR = 'STAR',
  SEARCH = 'SEARCH',
  CART = 'CART',
  INFO = 'INFO',
  GRID = 'GRID',
  LIST = 'LIST',
  CARET_DOWN = 'CARET_DOWN',
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
}

export abstract class IconConfig {
  icon?: {
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
  };
}

export interface IconConfigResource {
  type: IconResourceType | string;
  url?: string;
  types?: ICON_TYPE[];
}

export enum IconResourceType {
  SVG = 'svg',
  LINK = 'link',
}

export enum ICON_TYPES {
  CART = 'shopping-cart',
  SEARCH = 'search',
  GRID_MODE = 'th-large',
  LIST_MODE = 'bars',
  CARET_DOWN = 'angle-down',
  TIMES = 'times',
  INFO = 'info-circle',
  STAR = 'star',
  EXCLAMATION_CIRCLE = 'exclamation-circle',
  EXCLAMATION_TRIANGLE = 'exclamation-triangle',
  CHECK_CIRCLE = 'check-circle',
}

export abstract class IconConfig {
  icon?: {
    /** the path from where the SVG icons are loaded */
    svgPath?: string;

    /**
     * Indicates whether we should use inline SVG icon symbols.
     */
    useSvg?: boolean;

    /**
     * Each cx-icon will have class name that reflects the icon type by default.
     * You can customize this by applying a custom mapping to the icon type.
     */
    icons?: {
      [ICON_TYPES: string]: string;
    };

    /**
     * The prefix can be used to address the icon id (in svg) or icon class. Icon
     * libraries tend to prefix their icons. The prefix can be used for both prefixing
     * the svg id or style class:
     *
     * `fa-shopping-cart`
     * `fas-fa-shopping-cart`
     */
    prefix?: string;

    /**
     * Icon font libraries tend to manage the overall stylion by a generic
     * class. For example:
     * `fas fa-shopping-cart`
     *
     * In this example, `fas` is the generic style class that must be applied
     * to all icon elements.
     */
    iconClass?: string;
  };
}

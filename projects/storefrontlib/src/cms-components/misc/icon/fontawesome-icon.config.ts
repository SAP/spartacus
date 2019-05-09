import { IconConfig, ICON_TYPES } from './icon.config';

export const fontawesomeIconConfig: IconConfig = {
  icon: {
    iconClass: 'fas',
    prefix: 'fa-',
    icons: {
      [ICON_TYPES.SEARCH]: 'search',
      [ICON_TYPES.CART]: 'shopping-cart',
      [ICON_TYPES.INFO]: 'info-circle',
      [ICON_TYPES.STAR]: 'star',
      [ICON_TYPES.GRID_MODE]: 'th-large',
      [ICON_TYPES.LIST_MODE]: 'bars',
      [ICON_TYPES.CARET_DOWN]: 'angle-down',
    },
  },
};

/**
 * @deprecated since 2.0.0
 * NOTE: delete this file altogether, move below slots to the main default layout config
 */

import { LayoutConfig } from '../../../layout/config/layout-config';

export const PLPAccessibilityLayoutConfig: LayoutConfig = {
  layoutSlots: {
    ProductListPageTemplate: {
      slots: ['ProductLeftRefinements', 'ProductListSlot'],
    },
  },
};

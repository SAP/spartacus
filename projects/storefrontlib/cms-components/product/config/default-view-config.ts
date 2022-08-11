import { ViewConfig } from '../../../shared/config/view-config';

export const defaultViewConfig: ViewConfig = {
  view: {
    defaultPageSize: 12,
    infiniteScroll: {
      active: false,
      productLimit: 0,
      showMoreButton: false,
    },
  },
};

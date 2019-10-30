import { GroupSkipperSlotConfig } from './group-skipper.config';

export const defaultGroupSkipperSlotConfig: GroupSkipperSlotConfig = {
  groupSkipper: {
    slots: [
      {
        slot: 'SiteContext',
        enabled: true,
        title: 'Header',
      },
      {
        slot: 'ProductLeftRefinements',
        enabled: true,
        title: 'Product Facets',
      },
      {
        slot: 'ProductListSlot',
        enabled: true,
        title: 'Product List',
      },
      {
        slot: 'Footer',
        enabled: true,
        title: 'Footer',
      },
    ],
  },
};

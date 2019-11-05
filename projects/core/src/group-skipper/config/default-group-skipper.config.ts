import { GroupSkipperConfig, GroupSkipperType } from './group-skipper.config';

export const defaultGroupSkipperConfig: GroupSkipperConfig = {
  groupSkipperElements: [
    {
      type: GroupSkipperType.SLOT,
      name: 'SiteContext',
      title: 'Header',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'LandingPage2Template',
      title: 'Main Content',
    },
    {
      type: GroupSkipperType.SLOT,
      name: 'ProductLeftRefinements',
      title: 'Product Facets',
    },
    {
      type: GroupSkipperType.SLOT,
      name: 'ProductListSlot',
      title: 'Product List',
    },
    {
      type: GroupSkipperType.SLOT,
      name: 'Footer',
      title: 'Footer',
    },
  ],
};

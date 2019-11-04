import { GroupSkipperConfig } from './group-skipper.config';

export const defaultGroupSkipperConfig: GroupSkipperConfig = {
  groupSkipper: [
    {
      type: 'slot',
      id: 'SiteContext',
      enabled: true,
      title: 'Header',
    },
    {
      type: 'layout',
      id: 'LandingPage2Template',
      enabled: true,
      title: 'Main Content',
    },
    {
      type: 'slot',
      id: 'ProductLeftRefinements',
      enabled: true,
      title: 'Product Facets',
    },
    {
      type: 'slot',
      id: 'ProductListSlot',
      enabled: true,
      title: 'Product List',
    },
    {
      type: 'slot',
      id: 'Footer',
      enabled: true,
      title: 'Footer',
    },
  ],
};

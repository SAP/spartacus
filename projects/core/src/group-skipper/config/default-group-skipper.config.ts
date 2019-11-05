import { GroupSkipperConfig, GroupSkipperType } from './group-skipper.config';

export const defaultGroupSkipperConfig: GroupSkipperConfig = {
  groupSkipperElements: [
    {
      type: GroupSkipperType.SLOT,
      name: 'SiteContext',
      title: 'groupSkipper.titles.header',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'LandingPage2Template',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.SLOT,
      name: 'ProductLeftRefinements',
      title: 'groupSkipper.titles.productFacets',
    },
    {
      type: GroupSkipperType.SLOT,
      name: 'ProductListSlot',
      title: 'groupSkipper.titles.productList',
    },
    {
      type: GroupSkipperType.SLOT,
      name: 'Footer',
      title: 'groupSkipper.titles.footer',
    },
  ],
};

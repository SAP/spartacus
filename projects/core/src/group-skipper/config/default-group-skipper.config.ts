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
      type: GroupSkipperType.LAYOUT,
      name: 'LoginPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'AccountPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'ProductDetailsPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'CartPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'MultiStepCheckoutSummaryPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'OrderConfirmationPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'StoreFinderPageTemplate',
      title: 'groupSkipper.titles.main',
    },
    {
      type: GroupSkipperType.LAYOUT,
      name: 'ContentPage1Template',
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

import { SkipLinkConfig, SkipLinkScrollPosition } from './skip-link.config';

export const defaultSkipLinkConfig: SkipLinkConfig = {
  skipLinks: {
    SiteContext: {
      i18nKey: 'groupSkipper.titles.header',
    },
    BottomHeaderSlot: {
      position: SkipLinkScrollPosition.AFTER,
      i18nKey: 'groupSkipper.titles.main',
    },
    ProductLeftRefinements: {
      i18nKey: 'groupSkipper.titles.productFacets',
    },
    ProductListSlot: {
      i18nKey: 'groupSkipper.titles.productList',
    },
    Footer: {
      i18nKey: 'groupSkipper.titles.footer',
    },
  },
};

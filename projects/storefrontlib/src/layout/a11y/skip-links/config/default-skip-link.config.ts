import { SkipLinkConfig, SkipLinkScrollPosition } from './skip-link.config';

export const defaultSkipLinkConfig: SkipLinkConfig = {
  skipLinks: [
    {
      key: 'SiteContext',
      i18nKey: 'groupSkipper.titles.header',
    },
    {
      key: 'BottomHeaderSlot',
      position: SkipLinkScrollPosition.AFTER,
      i18nKey: 'groupSkipper.titles.main',
    },
    {
      key: 'ProductLeftRefinements',
      i18nKey: 'groupSkipper.titles.productFacets',
    },
    { key: 'ProductListSlot', i18nKey: 'groupSkipper.titles.productList' },
    { key: 'Footer', i18nKey: 'groupSkipper.titles.footer' },
  ],
};

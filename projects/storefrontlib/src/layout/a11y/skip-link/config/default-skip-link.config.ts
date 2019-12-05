import { SkipLinkConfig, SkipLinkScrollPosition } from './skip-link.config';

export const defaultSkipLinkConfig: SkipLinkConfig = {
  skipLinks: [
    {
      key: 'SiteContext',
      i18nKey: 'skipLink.labels.header',
    },
    {
      key: 'BottomHeaderSlot',
      position: SkipLinkScrollPosition.AFTER,
      i18nKey: 'skipLink.labels.main',
    },
    {
      key: 'ProductLeftRefinements',
      i18nKey: 'skipLink.labels.productFacets',
    },
    { key: 'ProductListSlot', i18nKey: 'skipLink.labels.productList' },
    { key: 'Footer', i18nKey: 'skipLink.labels.footer' },
  ],
};

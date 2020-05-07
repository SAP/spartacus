import { SkipLinkConfig } from './skip-link.config';

export const defaultSkipLinkConfig: SkipLinkConfig = {
  skipLinks: [
    {
      key: 'cx-header',
      i18nKey: 'skipLink.labels.header',
    },
    {
      key: 'cx-main',
      i18nKey: 'skipLink.labels.main',
    },
    { key: 'cx-footer', i18nKey: 'skipLink.labels.footer' },
  ],
};

import { lazyLoadMediaImagesByDefault } from './lazy-load-media-images-by-default';
import { addPreconnectLinkToCdnInSsr } from './preconnect-to-cdn';
import { useCdnForBackendAndMediaBaseUrl } from './use-cdn-for-backend-and-media-base-url';
import { useImageOptimizerReverseProxyForMedia } from './use-image-optimizer-reverse-proxy-for-media';
import { workaroundExtractBannerDimensionsFromUrl } from './workaround-extract-banner-dimensions-from-url';
import { workaroundMarkCertainBannersAsLcp } from './workaround-mark-certain-banners-as-lcp';

export const customProviders = [
  useCdnForBackendAndMediaBaseUrl,
  useImageOptimizerReverseProxyForMedia,
  lazyLoadMediaImagesByDefault,
  workaroundExtractBannerDimensionsFromUrl,
  addPreconnectLinkToCdnInSsr,
  workaroundMarkCertainBannersAsLcp,
];

import { Meta } from '@angular/platform-browser';
import { ServerConfig } from './server-config';

export const SERVER_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';
export const SERVER_BASE_URL_META_TAG_PLACEHOLDER =
  'OCC_BACKEND_BASE_URL_VALUE';

export function serverConfigFromMetaTagFactory(meta: Meta): ServerConfig {
  const baseUrl = getMetaTagContent(SERVER_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== SERVER_BASE_URL_META_TAG_PLACEHOLDER
    ? { server: { baseUrl } }
    : {};
}

function getMetaTagContent(name: string, meta: Meta) {
  const metaTag = meta.getTag(`name="${name}"`);
  return metaTag && metaTag.content;
}

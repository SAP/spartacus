import { Meta } from '@angular/platform-browser';
import { OccConfig } from './occ-config';

export const SERVER_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';
export const SERVER_BASE_URL_META_TAG_PLACEHOLDER =
  'OCC_BACKEND_BASE_URL_VALUE';

export function serverConfigFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(SERVER_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== SERVER_BASE_URL_META_TAG_PLACEHOLDER
    ? { backend: { occ: { baseUrl } } }
    : {};
}

function getMetaTagContent(name: string, meta: Meta) {
  const metaTag = meta.getTag(`name="${name}"`);
  return metaTag && metaTag.content;
}

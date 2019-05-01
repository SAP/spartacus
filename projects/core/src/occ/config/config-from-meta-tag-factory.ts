import { Meta } from '@angular/platform-browser';
import { OccConfig } from './occ-config';

export const OCC_BASE_URL_META_TAG_NAME = 'occ-backend-base-url';
export const OCC_BASE_URL_META_TAG_PLACEHOLDER = 'OCC_BACKEND_BASE_URL_VALUE';
export const MEDIA_BASE_URL_META_TAG_NAME = 'media-backend-base-url';
export const MEDIA_BASE_URL_META_TAG_PLACEHOLDER =
  'MEDIA_BACKEND_BASE_URL_VALUE';

export function occServerConfigFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(OCC_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== OCC_BASE_URL_META_TAG_PLACEHOLDER
    ? { backend: { occ: { baseUrl } } }
    : {};
}

export function mediaServerConfigFromMetaTagFactory(meta: Meta): OccConfig {
  const baseUrl = getMetaTagContent(MEDIA_BASE_URL_META_TAG_NAME, meta);
  return baseUrl && baseUrl !== MEDIA_BASE_URL_META_TAG_PLACEHOLDER
    ? { backend: { media: { baseUrl } } }
    : {};
}

function getMetaTagContent(name: string, meta: Meta) {
  const metaTag = meta.getTag(`name="${name}"`);
  return metaTag && metaTag.content;
}

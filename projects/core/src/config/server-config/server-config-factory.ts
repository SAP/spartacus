import { Meta } from '@angular/platform-browser';
import { ServerConfig } from './server-config';

export const META_TAG_OCC_BACKEND_BASE_URL = 'occ-backend-base-url';

export function serverConfigFactory(meta: Meta): ServerConfig {
  const baseUrl = getMetaTagContent(META_TAG_OCC_BACKEND_BASE_URL, meta);
  return baseUrl ? { server: { baseUrl } } : {};
}

function getMetaTagContent(name: string, meta: Meta) {
  const metaTag = meta.getTag(`name="${name}"`);
  return metaTag && metaTag.content;
}

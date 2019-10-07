// import {
//   OCC_BASE_URL_META_TAG_NAME,
//   OCC_BASE_URL_META_TAG_PLACEHOLDER,
// } from '../../../core/src/occ/config/config-from-meta-tag-factory';

import {
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from '@spartacus/core';

/**
 * Gets the occ base url from meta tag of the DOM
 *
 * @param rawHtml this param should be used in SSR where there is no access to the `document` object
 */
export function getOccBaseUrlFromMetaTag(rawHtml?: string) {
  let baseUrl;
  if (rawHtml) {
    const occBaseUrlMetaTagRegExp = /<meta\s+name\s*=\s*\"occ-backend-base-url\"\s+content\s*=\s*\"(.*)\"\s*\/?>/;
    const match = rawHtml.match(occBaseUrlMetaTagRegExp);
    baseUrl = match && match[1];
  } else {
    const meta = document.querySelector(
      `meta[name="${OCC_BASE_URL_META_TAG_NAME}"]`
    );
    baseUrl = meta && meta.getAttribute('content');
  }
  return baseUrl === OCC_BASE_URL_META_TAG_PLACEHOLDER ? null : baseUrl;
}

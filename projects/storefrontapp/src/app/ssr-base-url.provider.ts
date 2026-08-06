import { inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  OCC_BASE_URL_META_TAG_NAME,
  OccConfig,
  occServerConfigFromMetaTagFactory,
  WindowRef,
} from '@spartacus/core';
import { baseUrlMap } from './ssr-baser-url-mappings';

/**
 * Determine an OCC Base URL to use in SSR processing and set it to the OCC Base URL Meta tag.
 *
 * Allows for server-side assignment of OCC base URL without exposing url mappings.
 */
export const ssrBaseUrl = (): OccConfig => {
  console.log('ssrBaseUrl');
  const meta = inject(Meta);
  const windowRef = inject(WindowRef);

  /** Will be the value injected at pod startup */
  const initialBaseUrl =
    occServerConfigFromMetaTagFactory(meta).backend?.occ?.baseUrl;
  console.log('initialBaseUrl', initialBaseUrl);

  // read request data
  const originUrl = new URL(windowRef.location.origin as string);
  // const hrefUrl = new URL(windowRef.location.href as string); // If we need to read request path
  console.log('windowRef', JSON.stringify(windowRef.location, undefined, 2));

  // Business logic to determine baseUrl
  const baseUrl = baseUrlMap[originUrl?.hostname] ?? initialBaseUrl ?? 'UH-OH!'; // Uses a simple map

  // Set meta tag for CSR requests
  meta.updateTag({ name: OCC_BASE_URL_META_TAG_NAME, content: baseUrl });
  console.log('set meta tag to', baseUrl);

  // Return config partial for SSR requests
  const config = {
    backend: { occ: { baseUrl } },
  } satisfies OccConfig;
  console.log('adding config', JSON.stringify(config, undefined, 2));
  return config;
};

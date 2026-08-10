import { inject, makeStateKey, TransferState } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  Config,
  OccConfig,
  occServerConfigFromMetaTagFactory,
  WindowRef,
} from '@spartacus/core';

/**
 * State Transfer key for ssr-generated configuration
 */
export const ssrConfigurationState = makeStateKey<Config>(
  'ssrConfigurationState'
);

/**
 * Generate a configuration object for use in SSR context and set it as transfer
 * state to be used in the browser context.
 */
export const ssrConfigurationFactory = (): OccConfig => {
  const transferState = inject(TransferState);
  const windowRef = inject(WindowRef);
  const meta = inject(Meta);

  /* Read inputs */
  // read config value injected via HTML, could be used for fallback baseUrl
  const injectedConfig = occServerConfigFromMetaTagFactory(meta);
  const defaultHost = injectedConfig.backend?.occ?.baseUrl;
  // read page origin or href
  const pageOrigin = windowRef.location.origin;

  /* Base URL calculation logic */
  const subdomain = 'api';
  let calculatedBaseUrl: string | undefined;
  if (pageOrigin) {
    const origin = new URL(pageOrigin);

    // replace subdomain if it is a stage environment, otherwise add subdomain to host
    calculatedBaseUrl = origin.host.includes('model-t.myhybris.cloud')
      ? `https://${origin.host.replace(/^[^.]+/, subdomain)}`
      : `https://${subdomain}.${origin.host}`;
    calculatedBaseUrl = 'https://20.83.184.244:9002';
  }

  /* Return calculated base URL in configuration */
  const config = {
    backend: {
      occ: {
        baseUrl: calculatedBaseUrl ?? defaultHost,
        prefix: '/occ/v2/',
      },
    },
  } satisfies OccConfig;
  console.log(JSON.stringify(config, undefined, 2));

  /* Transfer completed configuration to browser */
  transferState.set(ssrConfigurationState, config);

  return config;
};

/**
 * Read and apply the ssr-generated configuration
 */
export const csrConfigurationFactory = (): OccConfig => {
  const transferState = inject(TransferState);
  const config = transferState.get(ssrConfigurationState, {});

  console.log('state transfer config', JSON.stringify(config, undefined, 2));

  return config;
};

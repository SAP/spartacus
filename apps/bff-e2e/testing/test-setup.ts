/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
// eslint-disable-next-line @nx/enforce-module-boundaries
import { type RootRouter } from '@repo/bff/router';
import {
  DEFAULT_BFF_PREFIX,
  DEFAULT_HOST,
  DEFAULT_PORT,
  DEFAULT_PREFIX,
} from '@vivaldi/config';
import { createTRPCClient } from '@vivaldi/trpc/client';
import { useBaseSiteId } from './use-base-site-id';

// Disable TLS certificate validation for testing purposes
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function getBaseUrl() {
  const host = process.env.HOST ?? DEFAULT_HOST;
  const port = process.env.PORT ?? DEFAULT_PORT;

  return `https://${host}:${port}${DEFAULT_BFF_PREFIX}`;
}

function getTrpcBaseUrl() {
  return getBaseUrl() + DEFAULT_PREFIX;
}

// Configure trpc
const trpc = createTRPCClient<RootRouter>({
  termination: {
    url: getTrpcBaseUrl(),
  },
  partialInputs: [useBaseSiteId()],
});

globalThis.trpc = trpc;
globalThis.baseUrl = getBaseUrl();
globalThis.trpcBaseUrl = getTrpcBaseUrl();

declare global {
  var trpc: ReturnType<typeof createTRPCClient<RootRouter>>;
  var baseUrl: ReturnType<typeof getBaseUrl>;
  var trpcBaseUrl: ReturnType<typeof getTrpcBaseUrl>;
}

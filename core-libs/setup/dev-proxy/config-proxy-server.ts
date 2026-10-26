/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import httpProxy from '@fastify/http-proxy';
import Fastify, { type FastifyInstance } from 'fastify';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DEFAULT_DEV_PROXY_CONFIG } from './defaults';
import type { DevProxyConfig } from './types';

/**
 * Creates and starts the Spartacus Dev Proxy server using Fastify.
 *
 * This proxy replicates the production Hosting Portal behavior locally:
 * - Serves `/config.json` directly from a local file
 * - Forwards all other requests to the upstream Angular dev server
 *
 * @param userConfig - Partial configuration overriding defaults
 * @returns A promise that resolves to the running Fastify server instance
 */
export async function startDevProxy(
  userConfig: Partial<DevProxyConfig> = {}
): Promise<FastifyInstance> {
  const config: DevProxyConfig = {
    ...DEFAULT_DEV_PROXY_CONFIG,
    ...userConfig,
  };

  const server = Fastify({
    logger: false,
    disableRequestLogging: true,
  });

  // Route: serve /config.json directly from the local file
  server.get(config.configPublicPath, (_req, reply) => {
    const configFilePath = path.resolve(config.configSourcePath);

    try {
      const content = fs.readFileSync(configFilePath, 'utf-8');
      // Validate it is parseable JSON before sending
      JSON.parse(content);

      reply
        .header('Content-Type', 'application/json')
        .header('Cache-Control', 'no-cache, no-store, must-revalidate')
        .header('Access-Control-Allow-Origin', '*')
        .send(content);
    } catch (error) {
      server.log.error(
        `[spartacus-dev-proxy] Failed to serve ${config.configPublicPath} from ${configFilePath}: ${error}`
      );
      reply.status(500).send({ error: 'Failed to read config file' });
    }
  });

  // Plugin: proxy all other requests to the upstream Angular dev server.
  // `websocket: true` is required so Angular's HMR / live-reload upgrade
  // requests pass through cleanly; without it, hot reload silently breaks.
  await server.register(httpProxy, {
    upstream: config.upstreamUrl,
    http2: false,
    websocket: true,
    // Tolerate self-signed certs on the upstream — harmless for plain-HTTP
    // upstreams (the default), and useful if a consumer points the proxy at
    // an HTTPS dev server with a self-signed cert.
    undici: { connect: { rejectUnauthorized: false } },
    replyOptions: {
      rewriteRequestHeaders: (originalReq, headers) => {
        if (config.setForwardedHost && originalReq.headers.host) {
          return {
            ...headers,
            'x-forwarded-host': originalReq.headers.host,
          };
        }
        return headers;
      },
    },
  });

  await server.listen({ port: config.port, host: 'localhost' });

  // eslint-disable-next-line no-console
  console.info(
    `[spartacus-dev-proxy] ready on http://localhost:${config.port}`
  );
  // eslint-disable-next-line no-console
  console.info(
    `[spartacus-dev-proxy]   ${config.configPublicPath} → local file (${config.configSourcePath})`
  );
  // eslint-disable-next-line no-console
  console.info(
    `[spartacus-dev-proxy]   * → upstream (${config.upstreamUrl})`
  );

  return server;
}

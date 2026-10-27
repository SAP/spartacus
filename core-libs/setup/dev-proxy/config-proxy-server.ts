/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DEFAULT_DEV_PROXY_CONFIG } from './defaults.js';
import type { DevProxyConfig } from './types.js';

// Load fastify and its proxy plugin from the consuming app's node_modules
// (relative to cwd), not from the dist directory of this package.
// Dynamic import() resolves from the importer's location, which is inside
// dist/setup — where fastify is not installed. createRequire(cwd) resolves
// from where the developer runs the command, where fastify is an
// optionalDependency that the app installed.
const cwdRequire = createRequire(path.join(process.cwd(), 'package.json'));

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
): Promise<any> {
  const Fastify = cwdRequire('fastify');
  const httpProxy = cwdRequire('@fastify/http-proxy');

  const config: DevProxyConfig = {
    ...DEFAULT_DEV_PROXY_CONFIG,
    ...userConfig,
  };

  const server = Fastify({
    logger: false,
    disableRequestLogging: true,
  });

  // Route: serve /config.json directly from the local file
  server.get(config.configPublicPath, (_req: unknown, reply: any) => {
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
      rewriteRequestHeaders: (originalReq: any, headers: any) => {
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

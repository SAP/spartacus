import { APP_BASE_HREF } from '@angular/common';
import { StaticProvider } from '@angular/core';
import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr';
import {
  NgExpressEngineDecorator,
  REQUEST,
  RESPONSE,
  SsrOptimizationOptions,
  defaultSsrOptimizationOptions,
} from '@spartacus/setup/ssr';
import type { Request, Response } from 'express';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import 'zone.js/node';
import { AppServerModule } from './src/main.server';

function getReqResProviders(req: Request, res?: Response): StaticProvider[] {
  const providers: StaticProvider[] = [
    {
      provide: REQUEST,
      useValue: req,
    },
  ];
  if (res) {
    providers.push({
      provide: RESPONSE,
      useValue: res,
    });
  }

  return providers;
}

export interface RenderOptions extends CommonEngineRenderOptions {
  req: Request;
  res?: Response;
}

function engine(setupOptions: Readonly<CommonEngineRenderOptions>) {
  const engine = new CommonEngine({
    bootstrap: setupOptions.bootstrap,
    providers: setupOptions.providers,
  });

  return function (
    filePath: string,
    options: object,
    callback: (err?: Error | null, html?: string) => void
  ) {
    try {
      const renderOptions = { ...options } as RenderOptions;
      if (!setupOptions.bootstrap && !renderOptions.bootstrap) {
        throw new Error('You must pass in a NgModule to be bootstrapped');
      }

      const { req } = renderOptions;
      const res = renderOptions.res ?? req.res;

      renderOptions.url =
        renderOptions.url ??
        `${req.protocol}://${req.get('host') || ''}${req.baseUrl}${req.url}`;
      renderOptions.documentFilePath =
        renderOptions.documentFilePath ?? filePath;
      renderOptions.providers = [
        ...(renderOptions.providers ?? []),
        getReqResProviders(req, res),
      ];
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      renderOptions.publicPath =
        renderOptions.publicPath ??
        setupOptions.publicPath ??
        (options as any).settings?.views;
      renderOptions.inlineCriticalCss =
        renderOptions.inlineCriticalCss ?? setupOptions.inlineCriticalCss;

      engine
        .render(renderOptions)
        .then((html) => callback(null, html))
        .catch(callback);
    } catch (err) {
      err instanceof Error && callback(err);
    }
  };
}

const ssrOptions: SsrOptimizationOptions = {
  timeout: Number(
    process.env['SSR_TIMEOUT'] ?? defaultSsrOptimizationOptions.timeout
  ),
  logger: true,
};

const ngExpressEngine = NgExpressEngineDecorator.get(engine, ssrOptions);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/storefrontapp');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // const commonEngine = new CommonEngine();
  server.set('trust proxy', 'loopback');

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  // server.get('*', (req, res, next) => {
  //   const { protocol, originalUrl, baseUrl, headers } = req;

  //   commonEngine
  //     .render({
  //       bootstrap: AppServerModule,
  //       documentFilePath: indexHtml,
  //       url: `${protocol}://${headers.host}${originalUrl}`,
  //       publicPath: browserDistFolder,
  //       providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
  //     })
  //     .then((html) => res.send(html))
  //     .catch((err) => next(err));
  // });
  server.get('*', (req: Request, res: Response) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

export * from './src/main.server';

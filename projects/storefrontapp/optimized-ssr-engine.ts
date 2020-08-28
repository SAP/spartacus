import * as fs from 'fs';

export interface OptimizedSsrOptions {
  /**
   * Time in milliseconds to wait for SSR rendering to happen.
   */
  timeout?: number;

  /**
   * Enable in-memory cache for pre-rendered urls.
   */
  cache?: boolean;
}

export function optimizedSsrEngine(
  expressEngine,
  ssrOptions?: OptimizedSsrOptions
) {
  // The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
  // response is evicted as soon as the first successful response is successfully returned.
  const renderedUrls: {
    [filePath: string]: {
      html?: any;
      err?: any;
    };
  } = {};

  return function wrappedEngine(
    filePath: string,
    options: any,
    callback: (err?: Error | null, html?: string) => void
  ) {
    const res = options.res || options.req.res;

    /**
     * When SSR page can not be returned in time, we're returnig index.html of
     * the CSR application.
     * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
     */
    function fallbackToCsr() {
      res.set('Cache-Control', 'no-store');
      callback(undefined, getDocument(filePath));
    }

    const isRenderingReady =
      renderedUrls[filePath]?.html || renderedUrls[filePath]?.err;
    if (isRenderingReady) {
      callback(renderedUrls[filePath].err, renderedUrls[filePath].html);

      if (!ssrOptions?.cache) {
        // we drop cached rendering if caching is disabled
        delete renderedUrls[filePath];
      }
    } else {
      let waitingForRender;

      if (!renderedUrls[filePath]) {
        // if there is no rendering already in progress

        if (ssrOptions?.timeout) {
          waitingForRender = setTimeout(() => {
            waitingForRender = undefined;
            fallbackToCsr();
            console.log(
              `SSR rendering exceeded timeout, fallbacking to CSR for ${options.req?.url}`
            );
          }, ssrOptions.timeout);
        } else {
          fallbackToCsr();
        }

        renderedUrls[filePath] = {};
        expressEngine(filePath, options, (err, html) => {
          if (waitingForRender) {
            // if request is still waiting for render, return it
            clearTimeout(waitingForRender);
            callback(err, html);

            if (ssrOptions?.cache) {
              renderedUrls[filePath] = { err, html };
            } else {
              delete renderedUrls[filePath];
            }
          } else {
            // store the rendering for future use
            renderedUrls[filePath] = { err, html };
          }
        });
      } else {
        // if there is already rendering in progress, return the fallback
        fallbackToCsr();
      }
    }
  };
}

const templateCache = {};

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string {
  return (templateCache[filePath] =
    templateCache[filePath] || fs.readFileSync(filePath).toString());
}

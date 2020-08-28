import * as fs from 'fs';

export interface OptimizedSSROptions {
  /**
   * Time in milliseconds to wait for SSR rendering to happen.
   */
  timeout: number;

  /**
   * Enable in-memory cache for prerendered urls
   */
  cache: boolean;
}

export function optimizedSSREngine(
  orgEngine,
  smartOptions?: OptimizedSSROptions
) {
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

    if (renderedUrls[filePath]?.html) {
      callback(renderedUrls[filePath].err, renderedUrls[filePath].html);

      if (!smartOptions.cache) {
        delete renderedUrls[filePath];
      }
    } else {
      let waitingForRender;

      const fallback = () => {
        res.set('Cache-Control', 'no-store');
        callback(undefined, getDocument(filePath));
      };

      if (!renderedUrls[filePath]) {
        if (smartOptions.timeout) {
          waitingForRender = setTimeout(() => {
            waitingForRender = undefined;
            fallback();
          }, smartOptions.timeout);
        } else {
          fallback();
        }

        renderedUrls[filePath] = {};
        orgEngine(filePath, options, (err, html) => {
          if (waitingForRender) {
            clearTimeout(waitingForRender);
            callback(err, html);

            if (smartOptions.cache) {
              renderedUrls[filePath] = { err, html };
            } else {
              delete renderedUrls[filePath];
            }
          } else {
            renderedUrls[filePath] = { err, html };
          }
        });
      } else {
        fallback();
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

import {
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from './config-from-meta-tag-factory';
import { OccBaseUrlMetaTagUtils } from './occ-base-url-meta-tag-utils';

describe('OccBaseUrlMetaTagUtils', () => {
  /**
   * Runs the test with meta tag added
   */
  function runWithOccBaseUrlMetaTag(content: string, test: Function) {
    // add meta to body
    const meta = document.createElement('meta');
    const head = document.getElementsByTagName('head')[0];
    meta.name = OCC_BASE_URL_META_TAG_NAME;
    meta.content = content;
    head.appendChild(meta);

    // run test
    test();

    // remove meta from body
    head.removeChild(meta);
  }

  describe('getFromDOM', () => {
    it('should return the base url from meta tag', () => {
      runWithOccBaseUrlMetaTag('testUrl', () =>
        expect(OccBaseUrlMetaTagUtils.getFromDOM()).toEqual('testUrl')
      );
    });

    it('should return null when the base url in the meta tag is a placeholder', () => {
      runWithOccBaseUrlMetaTag(OCC_BASE_URL_META_TAG_PLACEHOLDER, () =>
        expect(OccBaseUrlMetaTagUtils.getFromDOM()).toEqual(null)
      );
    });

    it('should return null when no base url from meta tag in DOM', () => {
      expect(OccBaseUrlMetaTagUtils.getFromDOM()).toEqual(null);
    });
  });

  describe('getFromRawHtml', () => {
    function getHtmlWithOccBaseUrlMetaTag(content: string) {
      const occBaseUrlMetaTag = content
        ? `<meta
      name="occ-backend-base-url"
      content="${content}"
    />`
        : ``;

      return `<!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />
          <meta charset="utf-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="assets/icons/icon-192x192.png"
          />
          ${occBaseUrlMetaTag}
          <meta
            name="media-backend-base-url"
            content="MEDIA_BACKEND_BASE_URL_VALUE"
          />
      
          <title>Spartacus Storefront</title>
          <base href="/" />
          <script
            id="smartedit-injector"
            src="webApplicationInjector.js"
            data-smartedit-allow-origin="localhost:9002"
          ></script>
        </head>
      
        <body>
          <cx-storefront>Loading...</cx-storefront>
        </body>
      </html>
      `;
    }

    it('should return the base url from meta tag', () => {
      const html = getHtmlWithOccBaseUrlMetaTag('testUrl');
      expect(OccBaseUrlMetaTagUtils.getFromRawHtml(html)).toEqual('testUrl');
    });

    it('should return null when the base url in the meta tag is a placeholder', () => {
      const html = getHtmlWithOccBaseUrlMetaTag(
        OCC_BASE_URL_META_TAG_PLACEHOLDER
      );
      expect(OccBaseUrlMetaTagUtils.getFromRawHtml(html)).toEqual(null);
    });

    it('should return null when no base url from meta tag in DOM', () => {
      const html = getHtmlWithOccBaseUrlMetaTag(undefined);
      expect(OccBaseUrlMetaTagUtils.getFromRawHtml(html)).toEqual(null);
    });
  });
});

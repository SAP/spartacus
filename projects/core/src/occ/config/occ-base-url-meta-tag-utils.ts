import {
  OCC_BASE_URL_META_TAG_NAME,
  OCC_BASE_URL_META_TAG_PLACEHOLDER,
} from './config-from-meta-tag-factory';

// should be private
export class OccBaseUrlMetaTagUtils {
  /**
   * Gets the OCC base url from the meta tag of the DOM.
   *
   * **CAUTION**: Run it only in the browser, because it uses the native DOM!
   */
  static getFromDOM() {
    const meta = document.querySelector(
      `meta[name="${OCC_BASE_URL_META_TAG_NAME}"]`
    );
    const baseUrl = meta && meta.getAttribute('content');
    return OccBaseUrlMetaTagUtils.handlePlaceholder(baseUrl);
  }

  /**
   * Gets the OCC base url from the meta tag of the given raw HTML string.
   *
   * @param rawHtml raw source of the index.html
   */
  static getFromRawHtml(rawHtml: string) {
    const occBaseUrlMetaTagRegExp = /<meta\s+name\s*=\s*\"occ-backend-base-url\"\s+content\s*=\s*\"(.*)\"\s*\/?>/;
    const match = rawHtml.match(occBaseUrlMetaTagRegExp);
    const baseUrl = match && match[1];
    return OccBaseUrlMetaTagUtils.handlePlaceholder(baseUrl);
  }

  private static handlePlaceholder(baseUrl: string): string {
    return baseUrl === OCC_BASE_URL_META_TAG_PLACEHOLDER ? null : baseUrl;
  }
}

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExternalJsFileLoader {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    @Inject(PLATFORM_ID) protected platformId?: Object
  ) {}

  /**
   * @deprecated since 3.2, use loadWithAttributes(src, params?, attributes?, callback?, errorCallback?)
   * instead. In 4.0, loadWithAttributes will be renamed to load.
   *
   * Loads a javascript from an external URL. Loading is skipped during SSR.
   * @param src URL for the script to be loaded
   * @param params additional parameters to be attached to the given URL
   * @param callback a function to be invoked after the script has been loaded
   * @param errorCallback function to be invoked after error during script loading
   */
  public load(
    src: string,
    params?: Object,
    callback?: EventListener,
    errorCallback?: EventListener
  ): void {
    this.loadWithAttributes(
      src,
      params,
      { type: 'text/javascript', async: true, defer: true },
      callback,
      errorCallback
    );
  }
  /**
   * Loads a javascript from an external URL. Loading is skipped during SSR.
   * @param src URL for the script to be loaded
   * @param params additional parameters to be attached to the given URL
   * @param attributes the attributes of HTML script tag (exclude src)
   * @param callback a function to be invoked after the script has been loaded
   * @param errorCallback function to be invoked after error during script loading
   */
  public loadWithAttributes(
    src: string,
    params?: Object,
    attributes?: Object,
    callback?: EventListener,
    errorCallback?: EventListener
  ): void {
    if (this.platformId && isPlatformServer(this.platformId)) {
      if (errorCallback) {
        errorCallback(new Event('error'));
      }
      return;
    }

    const script: HTMLScriptElement = this.document.createElement('script');
    if (params) {
      script.src = src + this.parseParams(params);
    } else {
      script.src = src;
    }

    if (attributes) {
      const attrKey = Object.keys(attributes);
      attrKey.forEach((key) => {
        if (key.startsWith('data-')) {
          // custom attributes
          script.setAttribute(key, attributes[key]);
        } else {
          script[key] = attributes[key];
        }
      });
    }

    if (callback) {
      script.addEventListener('load', callback);
    }
    if (errorCallback) {
      script.addEventListener('error', errorCallback);
    }

    this.document.head.appendChild(script);
  }

  /**
   * Parses the given object with parameters to a string "param1=value1&param2=value2"
   * @param params object containing parameters
   */
  private parseParams(params: Object): string {
    let result = '';
    const keysArray = Object.keys(params);
    if (keysArray.length > 0) {
      result =
        '?' +
        keysArray
          .map((key) => encodeURI(key) + '=' + encodeURI(params[key]))
          .join('&');
    }
    return result;
  }
}

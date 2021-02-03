import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export enum ScriptAddTo {
  HEAD = 'head',
  BODY = 'body',
}

@Injectable({
  providedIn: 'root',
})
export class ExternalJsFileLoader {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    @Inject(PLATFORM_ID) protected platformId?: Object
  ) {}

  /**
   * @deprecated since 3.2,
   * use addScript(src, params?, attributes?, callback?, errorCallback?, onSsr?, inElement?)
   * instead.
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
    this.addScript(
      src,
      params,
      { type: 'text/javascript', async: true, defer: true },
      callback,
      errorCallback
    );
  }
  /**
   * Loads a javascript from an external URL.
   * @param src URL for the script to be loaded
   * @param params additional parameters to be attached to the given URL
   * @param attributes the attributes of HTML script tag (exclude src)
   * @param callback a function to be invoked after the script has been loaded
   * @param errorCallback function to be invoked after error during script loading
   * @param onSsr whether add script on SSR, by default false (CSR)
   * @param inElement HTML body or head where script will be placed
   */
  public addScript(
    src: string,
    params?: Object,
    attributes?: Object,
    callback?: EventListener,
    errorCallback?: EventListener,
    onSsr = false,
    inElement = ScriptAddTo.HEAD
  ): void {
    if (
      (!onSsr && this.platformId && isPlatformServer(this.platformId)) ||
      (onSsr && this.hasScript(src))
    ) {
      return;
    }

    if (params) {
      src = src + this.parseParams(params);
    }
    const script: HTMLScriptElement = this.document.createElement('script');
    script.src = src;

    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        // custom attributes
        if (key.startsWith('data-')) {
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

    inElement === ScriptAddTo.HEAD
      ? this.document.head.appendChild(script)
      : this.document.body.appendChild(script);
  }

  /**
   * Indicates if the script is already added to the DOM.
   */
  protected hasScript(src?: string): boolean {
    return !!this.document.querySelector(`script[src="${src}"]`);
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

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export enum ScriptPlacement {
  HEAD = 'head',
  BODY = 'body',
}

@Injectable({
  providedIn: 'root',
})
export class ScriptLoader {
  constructor(
    @Inject(DOCUMENT) protected document: any,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

  /**
   * Embeds a javascript from an external URL.
   *
   * @param embedOptions
   * src: URL for the script to be loaded
   * params: additional parameters to be attached to the given URL
   * attributes: the attributes of HTML script tag (exclude src)
   * callback: a function to be invoked after the script has been loaded
   * errorCallback: function to be invoked after error during script loading
   * placement: HTML body or head where script will be placed
   */
  public embedScript(embedOptions: {
    src: string;
    params?: Object;
    attributes?: Object;
    callback?: EventListener;
    errorCallback?: EventListener;
    placement?: ScriptPlacement;
  }): void {
    const {
      src,
      params,
      attributes,
      callback,
      errorCallback,
      placement = ScriptPlacement.HEAD,
    } = embedOptions;

    const isSSR = isPlatformServer(this.platformId);
    if ((callback || errorCallback) && isSSR) {
      return;
    }

    const source = params ? src + this.parseParams(params) : src;
    if (!isSSR && this.hasScript(source)) {
      return;
    }

    const script: HTMLScriptElement = this.document.createElement('script');
    script.src = source;
    script.async = true;
    script.defer = true;

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

    placement === ScriptPlacement.HEAD
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

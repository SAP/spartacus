import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ExternalJsFileLoader {
  constructor(@Inject(DOCUMENT) private document: any) {}

  /**
   * Loads a javascript from an external URL
   * @param src URL for the script to be loaded
   * @param params additional parameters to be attached to the given URL
   * @param callback a function to be invoked after the script has been loaded
   */
  public load(src: string, params?: Object, callback?: EventListener): void {
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    if (params) {
      script.src = src + this.parseParams(params);
    } else {
      script.src = src;
    }

    script.async = true;
    script.defer = true;
    if (callback) {
      script.addEventListener('load', callback);
    }

    document.head.appendChild(script);
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
          .map(key => encodeURI(key) + '=' + encodeURI(params[key]))
          .join('&');
    }
    return result;
  }
}

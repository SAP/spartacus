import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class ExternalJsFileLoader {
    constructor(@Inject(DOCUMENT)private document: Document) { }

  public load(src: string, params: Object, callback: EventListener): void {
    const script = this.document.createElement('script');
    script.type = 'text/javascript';
    script.src = src + this.parseParams(params);
    script.async = true;
    script.defer = true;
    script.addEventListener('load', callback);

    document.head.appendChild(script);
  }

  protected parseParams(params: Object): string {
    let result = '';
    const keysArray = Object.keys(params);
    if (keysArray.length > 0) {
     result = '?' + keysArray.map(key => key + '=' + params[key]).join('&');
    }
    return result;
  }
}

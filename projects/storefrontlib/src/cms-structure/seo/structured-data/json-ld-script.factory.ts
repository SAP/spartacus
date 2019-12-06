import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

import { WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class JsonLdScriptFactory {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: string,
    protected winRef: WindowRef,
    protected rendererFactory: RendererFactory2
  ) {}

  build(schema: {}[]): void {
    if (schema && this.isJsonLdRequired()) {
      this.createJsonLdScriptElement().innerHTML = JSON.stringify(schema);
    }
  }

  /**
   * Only return schema data in case of SSR or development mode,
   * to not waste memory unnecessary.
   */
  isJsonLdRequired(): boolean {
    return !isPlatformBrowser(this.platformId) || isDevMode();
  }

  private createJsonLdScriptElement(): HTMLScriptElement {
    const id = 'json-ld';
    let scriptElement: HTMLScriptElement = <HTMLScriptElement>(
      this.winRef.document.getElementById(id)
    );

    if (!scriptElement) {
      const renderer: Renderer2 = this.rendererFactory.createRenderer(
        null,
        null
      );
      const script: HTMLScriptElement = renderer.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      renderer.appendChild(this.winRef.document.body, script);
      scriptElement = script;
    }
    return scriptElement;
  }
}

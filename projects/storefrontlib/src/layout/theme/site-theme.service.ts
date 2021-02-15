import {
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { SiteContextConfig, THEME_CONTEXT_ID } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class SiteThemeService {
  protected rootComponent: ComponentRef<any>;
  protected renderer: Renderer2;

  constructor(
    protected config: SiteContextConfig,
    protected rendererFactory: RendererFactory2
  ) {}

  init(rootComponent: ComponentRef<any>) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    // allow to initialize only once
    if (!this.rootComponent) {
      this.rootComponent = rootComponent;
      this.setTheme(this.config.context[THEME_CONTEXT_ID]?.[0]);
    }
  }

  setTheme(theme: string) {
    if (theme) {
      const element = this.rootComponent.location.nativeElement;
      // remove the old theme
      Array.from(element.classList).forEach((attr: string) => {
        if (attr.startsWith('cx-theme--')) {
          this.renderer.removeClass(element, attr);
        }
      });
      // add the new theme
      this.renderer.addClass(element, `cx-theme--${theme}`);
    }
  }
}

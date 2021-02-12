import {
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { SiteThemeConfig } from './site-theme.config';

@Injectable({ providedIn: 'root' })
export class SiteThemeService {
  protected rootComponent: ComponentRef<any>;
  protected renderer: Renderer2;

  constructor(
    protected config: SiteThemeConfig,
    protected rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init(rootComponent: ComponentRef<any>) {
    // allow to initialize only once
    if (!this.rootComponent) {
      this.rootComponent = rootComponent;
      this.setTheme(this.config.theme);
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

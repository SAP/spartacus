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
      this.renderer.addClass(
        this.rootComponent.location.nativeElement,
        `cx-theme--${theme}`
      );
    }
  }
}

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
  protected existingTheme: string;

  constructor(
    protected config: SiteContextConfig,
    protected rendererFactory: RendererFactory2
  ) {}

  init(rootComponent: ComponentRef<any>): void {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.rootComponent = rootComponent;
    this.setTheme(this.config.context[THEME_CONTEXT_ID]?.[0]);
  }

  setTheme(theme: string): void {
    if (theme) {
      const element = this.rootComponent.location.nativeElement;
      // remove the old theme
      this.renderer.removeClass(element, this.existingTheme);
      // add the new theme
      this.renderer.addClass(element, theme);
      this.existingTheme = theme;
    }
  }
}

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
  protected renderer: Renderer2 = this.rendererFactory.createRenderer(
    null,
    null
  );

  constructor(
    protected config: SiteThemeConfig,
    protected rendererFactory: RendererFactory2
  ) {}

  init(rootComponent: ComponentRef<any>) {
    // allow to initialize only once
    if (!this.rootComponent) {
      this.rootComponent = rootComponent;
      this.setTheme(this.config.theme);
    }
  }

  setTheme(theme: string) {
    console.log(theme);
    console.log(this.rootComponent);

    // TODO: apply a css class on the root component, i.e. `cx-theme--<THEME_VALUE>`
    // this.renderer.addClass(this.rootComponent.instance, `cx-theme--${theme}`); // NOT WORKING?
  }
}

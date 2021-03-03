import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { SiteContextConfig, THEME_CONTEXT_ID } from '@spartacus/core';

const THEME_LINK_ID = 'cx-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  protected rootComponent: ComponentRef<any>;
  protected renderer: Renderer2;
  protected existingTheme: string;

  constructor(
    protected config: SiteContextConfig,
    protected rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) protected document: Document
  ) {}

  /**
   * This function is to be called for the root component that is
   * bootstrapped.
   */
  init(rootComponent: ComponentRef<any>): void {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.rootComponent = rootComponent;
    // Theme value is a string. It is put in the generic multi-value
    // property of the SiteContextConfig. So the array's first item
    // is the theme value.
    this.setTheme(this.config.context?.[THEME_CONTEXT_ID]?.[0] as string);
  }

  setTheme(theme: string): void {
    if (theme) {
      const element = this.rootComponent.location.nativeElement;
      // remove the old theme
      this.renderer.removeClass(element, this.existingTheme);
      // add the new theme
      this.renderer.addClass(element, theme);
      this.existingTheme = theme;

      this.loadTheme(`${theme}.css`);
    }
  }

  private loadTheme(filename: string) {
    const themeLink = this.document.getElementById(
      THEME_LINK_ID
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = filename;
    } else {
      const linkEl = this.renderer.createElement('link');
      linkEl.id = THEME_LINK_ID;
      linkEl.rel = 'stylesheet';
      linkEl.type = 'text/css';
      linkEl.href = filename;
      this.renderer.appendChild(this.document.head, linkEl);
    }
  }
}

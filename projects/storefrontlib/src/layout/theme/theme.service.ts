import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { SiteContextConfig, THEME_CONTEXT_ID } from '@spartacus/core';
import { Observable, ReplaySubject } from 'rxjs';

const THEME_LINK_ID = 'cx-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  protected rootComponent: ComponentRef<any>;
  protected renderer: Renderer2;
  protected existingTheme: string;

  protected loaded$ = new ReplaySubject<boolean>(1);

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
    let theme = this.config.context?.[THEME_CONTEXT_ID]?.[0];
    if (theme) {
      this.setTheme(theme);
    }
  }

  isLoaded(): Observable<boolean> {
    return this.loaded$.asObservable();
  }

  setTheme(theme: string): void {
    const element = this.rootComponent.location.nativeElement;
    // remove the old theme
    this.renderer.removeClass(element, this.existingTheme);
    // add the new theme
    this.renderer.addClass(element, theme);
    this.existingTheme = theme;

    // load theme css
    this.loadTheme(`${theme}.css`);
  }

  private loadTheme(filename: string): void {
    let themeLink = this.document.getElementById(
      THEME_LINK_ID
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = filename;
    } else {
      themeLink = this.renderer.createElement('link');
      themeLink.id = THEME_LINK_ID;
      themeLink.rel = 'stylesheet';
      themeLink.type = 'text/css';
      themeLink.href = filename;
      this.renderer.appendChild(this.document.head, themeLink);
    }
    themeLink.onload = () => this.loaded$.next(true);
  }
}

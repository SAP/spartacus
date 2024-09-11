/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
  inject,
} from '@angular/core';
import {
  FeatureConfigService,
  SiteContextConfig,
  SiteThemeService,
  THEME_CONTEXT_ID,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  protected siteThemeService = inject(SiteThemeService);
  protected featureConfigService = inject(FeatureConfigService);
  protected rootComponent: ComponentRef<any>;
  protected renderer: Renderer2;
  protected existingTheme: string;

  constructor(
    protected config: SiteContextConfig,
    protected rendererFactory: RendererFactory2
  ) {}
  protected subscription = new Subscription();

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
    if (this.featureConfigService.isEnabled('useSiteThemeService')) {
      this.subscription.add(
        this.siteThemeService
          .getActive()
          .subscribe((activeTheme) => this.setTheme(activeTheme))
      );
    } else {
      this.setTheme(this.config.context?.[THEME_CONTEXT_ID]?.[0]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setTheme(theme: string | undefined): void {
    const element = this.rootComponent.location.nativeElement;

    if (this.featureConfigService.isEnabled('useSiteThemeService')) {
      if (this.existingTheme) {
        this.renderer.removeClass(element, this.existingTheme);
      }
      if (theme) {
        this.renderer.addClass(element, theme);
        this.existingTheme = theme;
      }
    } else {
      if (theme) {
        this.renderer.removeClass(element, this.existingTheme);
        this.renderer.addClass(element, theme);
        this.existingTheme = theme;
      }
    }
  }
}

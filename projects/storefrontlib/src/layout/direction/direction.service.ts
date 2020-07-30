import { Injectable, OnDestroy } from '@angular/core';
import { LanguageService, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { DirectionMode } from '../config/direction.model';
import { LayoutConfig } from '../config/layout-config';

@Injectable({
  providedIn: 'root',
})
export class DirectionService implements OnDestroy {
  protected subscription = new Subscription();
  protected activeLanguage$: Observable<
    string
  > = this.languageService.getActive();

  constructor(
    protected layoutConfig: LayoutConfig,
    protected languageService: LanguageService,
    protected winRef: WindowRef
  ) {
    this.initialize();
  }

  /**
   * Initializes the layout direction for the storefront. The layout direction is configurable
   * by using a default direction mode (rtl, ltr or auto), but the detect option is preferred, so that
   * multiple direction modes are supported in a multi-site or multi-lingual setup>.
   *
   * The `initialize` method is called from the constructor and should not be called more then once.
   */
  protected initialize() {
    if (this.layoutConfig?.direction?.detect) {
      this.subscription.add(
        this.activeLanguage$.subscribe((isoCode: string) =>
          this.addDirection(
            this.winRef.document.documentElement,
            this.getDirection(isoCode)
          )
        )
      );
    } else {
      this.addDirection(
        this.winRef.document.documentElement,
        this.layoutConfig.direction.mode
      );
    }
  }

  /**
   * Reusable method that sets the direction attribute for the given element.
   *
   * ```html
   * <html dir="auto">
   * ```
   */
  addDirection(el: HTMLElement, direction?: DirectionMode) {
    el.dir = direction;
  }

  /**
   * Gets the DirectionModel for the given language isoCode. The language isoCode is compared
   * to the configured list of languages(`direction.rtlLanguages` vs `direction.ltrLanguages`).
   *
   * If no language is given, or no language mapping could be found, we fallback to the default
   * `direction.mode` or LTR as a last resort.
   *
   * The method is made public for developers, so that the lower level config can be omitted in code.
   */
  getDirection(languageIsoCode?: string): DirectionMode {
    if (
      languageIsoCode &&
      this.layoutConfig?.direction?.rtlLanguages?.includes(languageIsoCode)
    ) {
      return DirectionMode.RTL;
    }
    if (
      languageIsoCode &&
      this.layoutConfig?.direction?.ltrLanguages?.includes(languageIsoCode)
    ) {
      return DirectionMode.LTR;
    }
    return this.layoutConfig?.direction?.mode || DirectionMode.LTR;
  }

  ngOnDestroy() {
    // Cleans up the subscription, to avoid memory leaks in SSR.
    this.subscription.unsubscribe();
  }
}

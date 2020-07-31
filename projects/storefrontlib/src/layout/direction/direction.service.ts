import { Injectable, OnDestroy } from '@angular/core';
import { LanguageService, WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { DirectionMode, LayoutDirection } from '../config/direction.model';

/**
 * The DirectionService can be used to add the direction for the overall storefront.
 * While direction is configurable by using a default direction mode (rtl, ltr or auto), it is
 * recommended to use the _detect_ option so that various direction modes are supported cross
 * sites and languages.
 */
@Injectable({
  providedIn: 'root',
})
export class DirectionService implements OnDestroy {
  protected startsDetecting = false;

  protected subscription = new Subscription();

  constructor(
    protected languageService: LanguageService,
    protected winRef: WindowRef
  ) {}

  /**
   * Initializes the layout direction for the storefront.
   */
  initialize(config: LayoutDirection): void {
    if (config?.detect) {
      this.detect(config);
    } else {
      this.addDirection(this.winRef.document.documentElement, config?.default);
    }
  }

  /**
   * Observes the _active_ language and set the required direction for the given language.
   */
  protected detect(config: LayoutDirection) {
    if (this.startsDetecting) {
      return;
    }
    this.subscription.add(
      this.languageService
        .getActive()
        .subscribe((isoCode: string) =>
          this.addDirection(
            this.winRef.document.documentElement,
            this.getDirection(config, isoCode)
          )
        )
    );
    this.startsDetecting = true;
  }

  /**
   * Sets the direction attribute for the given element.
   *
   * ```html
   * <html dir="ltr">
   * ```
   */
  addDirection(el: HTMLElement, direction: DirectionMode): void {
    if (direction) {
      el.dir = direction;
    }
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
  getDirection(
    config: LayoutDirection,
    languageIsoCode?: string
  ): DirectionMode {
    if (languageIsoCode && config.rtlLanguages?.includes(languageIsoCode)) {
      return DirectionMode.RTL;
    }
    if (languageIsoCode && config?.ltrLanguages?.includes(languageIsoCode)) {
      return DirectionMode.LTR;
    }
    return config?.default;
  }

  ngOnDestroy(): void {
    // Cleans up the subscription, to avoid memory leaks in SSR.
    this.subscription.unsubscribe();
  }
}

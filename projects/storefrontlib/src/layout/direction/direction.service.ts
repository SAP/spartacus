import { Injectable, OnDestroy } from '@angular/core';
import {
  ConfigInitializerService,
  LanguageService,
  WindowRef,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DirectionConfig } from './config/direction.config';
import { Direction, DirectionMode } from './config/direction.model';

/**
 * The `DirectionService` can be used to add the direction to the overall storefront or individual elements.
 * By default, the direction is added to the `html` element (i.e. `<html dir="ltr">`). The API of this service
 * does however provide methods to add direction to individual elements if needed.
 *
 * The direction is configurable and allows for language driven direction configuration.
 *
 * To react to the active language, the service subscribes to the active language in the initialize method. This
 * is called from an APP_INITIALIZER method and should only happen once.
 */
@Injectable({
  providedIn: 'root',
})
export class DirectionService implements OnDestroy {
  protected config: Direction;
  protected startsDetecting = false;

  protected subscription = new Subscription();

  constructor(
    protected configInit: ConfigInitializerService,
    protected languageService: LanguageService,
    protected winRef: WindowRef
  ) {}

  /**
   * Initializes the layout direction for the storefront.
   */
  initialize(): Promise<any> {
    return this.configInit
      .getStable('direction')
      .pipe(
        tap((config: DirectionConfig) => {
          this.config = config?.direction;
          if (this.config?.detect) {
            this.detect();
          } else {
            this.setDirection(
              this.winRef.document.documentElement,
              this.config?.default
            );
          }
        })
      )
      .toPromise();
  }

  /**
   * Observes the _active_ language and set the required direction for the given language.
   * The method is guarded to ensure that the active language is observed only once.
   */
  protected detect() {
    if (this.startsDetecting) {
      return;
    }
    this.subscription.add(
      this.languageService
        .getActive()
        .subscribe((isoCode: string) =>
          this.setDirection(
            this.winRef.document.documentElement,
            this.getDirection(isoCode)
          )
        )
    );
    this.startsDetecting = true;
  }

  /**
   * Sets the direction attribute for the given element. If the direction is undefined, the `dir`
   * attribute is removed.
   */
  setDirection(el: HTMLElement, direction: DirectionMode): void {
    if (direction) {
      el.setAttribute('dir', direction);
    } else {
      el.removeAttribute('dir');
    }
  }

  /**
   * Gets the `DirectionMode` for the given language isoCode. The language isoCode is compared
   * to the configured list of languages(`direction.rtlLanguages` vs `direction.ltrLanguages`).
   *
   * If no language is given, or no language mapping could be found, we fallback to the default
   * `direction.mode`.
   */
  getDirection(language?: string): DirectionMode {
    if (language && this.config?.rtlLanguages?.includes(language)) {
      return DirectionMode.RTL;
    }
    if (language && this.config?.ltrLanguages?.includes(language)) {
      return DirectionMode.LTR;
    }
    return this.config?.default;
  }

  ngOnDestroy(): void {
    // Cleans up the subscription, to avoid memory leaks in SSR.
    this.subscription.unsubscribe();
  }
}

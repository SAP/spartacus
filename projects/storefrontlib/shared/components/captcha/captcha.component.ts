import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { CaptchaApiConfig } from './captcha-api-config';
import { CaptchaRenderer } from './captcha.renderer';

@Component({
  selector: 'cx-captcha',
  templateUrl: './captcha.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent implements AfterViewInit, OnDestroy {
  // Emits true if user confirms captcha
  @Output() confirmed = new EventEmitter<boolean>();

  @ViewChild('captcha', { static: false }) captchaRef: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected config: CaptchaApiConfig,
    protected injector: Injector
  ) {}

  /**
   * Add fields from CaptchaApiConfig. Call backend to get captcha
   * config.
   */
  ngAfterViewInit(): void {
    this.resetCaptcha();
  }

  /**
   * Loads the captcha based on the config
   */
  protected loadCaptcha(): void {
    if (this.config?.captchaRenderer) {
      const captchaRenderer = this.injector.get<CaptchaRenderer>(
        this.config.captchaRenderer
      );

      this.subscription.add(
        captchaRenderer
          .getCaptchaConfig()
          .pipe(
            concatMap((captchaConfig) => {
              if (captchaConfig?.enabled) {
                return captchaRenderer.renderCaptcha({
                  element: this.captchaRef.nativeElement,
                });
              } else {
                return of(null);
              }
            })
          )
          .subscribe(() => {
            this.confirmed.emit(true);
          })
      );
    }
  }

  /**
   * Resets the captcha, typically called when the component is re-initialized
   */
  resetCaptcha(): void {
    if (this.config?.captchaRenderer) {
      const captchaRenderer = this.injector.get<CaptchaRenderer>(
        this.config.captchaRenderer
      );

      // Reset the CAPTCHA widget if the provider supports it
      captchaRenderer.resetCaptcha(this.captchaRef.nativeElement);

      // Re-render the CAPTCHA to ensure it shows the "I'm not a robot" state
      this.loadCaptcha();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

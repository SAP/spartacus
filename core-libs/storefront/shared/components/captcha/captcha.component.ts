/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  inject,
  output,
  viewChild,
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
  protected config = inject(CaptchaApiConfig);
  protected injector = inject(Injector);

  // Emits true if user confirms captcha
  readonly confirmed = output<boolean>();

  readonly captchaRef = viewChild.required<ElementRef>('captcha');

  protected subscription = new Subscription();

  /**
   * Add fields from CaptchaApiConfig. Call backend to get captcha
   * config.
   */
  ngAfterViewInit(): void {
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
                  element: this.captchaRef().nativeElement,
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

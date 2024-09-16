/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  OnDestroy,
  Output,
  Renderer2,
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
    protected injector: Injector,
    private renderer: Renderer2
  ) {}

  /**
   * Add fields from CaptchaApiConfig. Call backend to get captcha
   * config.
   */
  ngAfterViewInit(): void {
    const fields = this.config?.fields;
    if (fields) {
      Object.keys(fields).forEach((key) => {
        if (fields[key]) {
          this.renderer.setAttribute(
            this.captchaRef.nativeElement,
            key,
            fields[key]
          );
        }
      });
    }

    if (this.config?.captchaRenderer) {
      const captchaRenderer = this.injector.get<CaptchaRenderer>(
        this.config.captchaRenderer
      );
      this.subscription.add(
        captchaRenderer
          .getCaptchaConfig()
          .pipe(
            concatMap((captchaConfig) => {
              if (captchaConfig?.enabled && captchaConfig?.publicKey) {
                return captchaRenderer.renderCaptcha({
                  element: this.captchaRef.nativeElement,
                  publicKey: captchaConfig.publicKey,
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

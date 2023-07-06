/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';

import { CaptchaApiConfig } from './config/captcha-api-config';
import { CaptchaProvider } from './captcha.model';

@Component({
  selector: 'cx-captcha',
  templateUrl: './captcha.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent implements AfterViewInit, OnDestroy {
  @Input() control: AbstractControl;

  // Emits true if user confirms captcha
  @Output() confirmed = new EventEmitter<boolean>();
  // Emits whether captcha is enabled after calling the backend
  @Output() enabled = new EventEmitter<boolean>();

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

    if (this.config?.captchaProvider) {
      const captchaProvider = this.injector.get<CaptchaProvider>(
        this.config.captchaProvider
      );
      this.subscription.add(
        captchaProvider
          .getCaptchaConfig()
          .pipe(
            concatMap((captchaConfig) => {
              if (captchaConfig?.enabled && captchaConfig?.publicKey) {
                this.enabled.emit(true);
                return captchaProvider.renderCaptcha({
                  element: this.captchaRef.nativeElement,
                  publicKey: captchaConfig.publicKey,
                });
              } else {
                this.enabled.emit(false);
                return of(null);
              }
            })
          )
          .subscribe(() => {
            this.control.setValue(true);
            this.confirmed.emit(true);
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

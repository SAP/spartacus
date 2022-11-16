/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CaptchaService } from 'projects/storefrontlib/shared/components/captcha/captcha.service';
import { CaptchaApiConfig } from './config/captcha-api-config';
import { of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'cx-captcha',
  templateUrl: './captcha.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent implements AfterViewInit, OnDestroy {
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() enabled = new EventEmitter<boolean>();

  @ViewChild('captcha', { static: false }) captchaRef: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected config: CaptchaApiConfig,
    protected captchaService: CaptchaService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (this.config?.fields) {
      Object.keys(this.config.fields).forEach((key) => {
        if (this.config.fields[key]) {
          this.renderer.setAttribute(
            this.captchaRef.nativeElement,
            key,
            this.config.fields[key]
          );
        }
      });
    }

    this.subscription.add(
      this.captchaService
        .getCaptchaConfig()
        .pipe(
          concatMap((captchaConfig) => {
            if (captchaConfig?.enabled && captchaConfig?.publicKey) {
              this.enabled.emit(true);
              return this.captchaService.renderCaptcha(
                this.captchaRef.nativeElement,
                captchaConfig.publicKey
              );
            } else {
              this.enabled.emit(false);
              return of(null);
            }
          })
        )
        .subscribe(() => this.confirmed.emit(true))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

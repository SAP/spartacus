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
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CaptchaService } from '@spartacus/storefront';
import { CaptchaApiConfig } from './config/captcha-api-config';
import { of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'cx-captcha',
  templateUrl: './captcha.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent implements AfterViewInit, OnDestroy {
  @Input() control: AbstractControl;
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
        .subscribe(() => {
          this.control.setValue(true);
          this.confirmed.emit(true);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

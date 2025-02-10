/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectorRef,
  inject,
  isDevMode,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '../logger';
import { ObjectComparisonUtils } from '../util/object-comparison-utils';
import {
  isTranslatable,
  Translatable,
  TranslatableParams,
} from './translatable';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'cxTranslate',
  pure: false,
  standalone: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string;
  private lastOptions: object;
  private translatedValue: string;
  private sub: Subscription;

  protected logger = inject(LoggerService);

  constructor(
    protected service: TranslationService,
    protected cd: ChangeDetectorRef
  ) {}

  transform(
    input: Translatable | string | string[],
    options: TranslatableParams = {}
  ): string {
    if (!input) {
      if (isDevMode()) {
        this.logger.error(
          `The given input for the cxTranslate pipe (${input}) is invalid and cannot be translated`
        );
      }
      return '';
    }

    if (isTranslatable(input) && input.raw) {
      return input.raw;
    }

    if (isTranslatable(input) && input.params) {
      options = { ...options, ...input.params };
    }

    const key = isTranslatable(input) ? input.key : input;

    this.translate(key, options);
    return this.translatedValue;
  }

  private translate(key: any, options: object) {
    if (
      key !== this.lastKey ||
      !ObjectComparisonUtils.shallowEqualObjects(options, this.lastOptions)
    ) {
      this.lastKey = key;
      this.lastOptions = options;

      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.service
        .translate(key, options, true)
        .subscribe((val) => this.markForCheck(val));
    }
  }

  private markForCheck(value: string) {
    this.translatedValue = value;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

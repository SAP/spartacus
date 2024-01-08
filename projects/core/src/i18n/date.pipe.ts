/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DatePipe, getLocaleId } from '@angular/common';
import { Pipe, PipeTransform, inject, isDevMode } from '@angular/core';
import { LoggerService } from '../logger';
import { LanguageService } from '../site-context/facade/language.service';

// type CxDatePipe, not DatePipe, due to conflict with Angular's DatePipe - problem occurs for the backward compatibility compiler of Ivy
@Pipe({ name: 'cxDate' })
export class CxDatePipe extends DatePipe implements PipeTransform {
  protected logger = inject(LoggerService);

  constructor(protected language: LanguageService) {
    super('');
  }

  // TODO: Replace `any` to match strict types from angular in 4.0
  // Overload to support stricter type check from angular 11 onwards
  transform(value: any, format?: string, timezone?: string): string | null;
  transform(value: null | undefined, format?: string, timezone?: string): null;
  transform(value: any, format?: string, timezone?: string): string | null {
    return super.transform(value, format, timezone, this.getLang());
  }

  private getLang() {
    const lang = this.getActiveLang();
    try {
      getLocaleId(lang);
      return lang;
    } catch {
      this.reportMissingLocaleData(lang);
      return 'en';
    }
  }

  private getActiveLang(): string {
    let result = '';
    this.language
      .getActive()
      .subscribe((lang) => (result = lang))
      .unsubscribe();
    return result;
  }

  private reportMissingLocaleData(lang: string) {
    if (isDevMode()) {
      this.logger.warn(
        `cxDate pipe: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}

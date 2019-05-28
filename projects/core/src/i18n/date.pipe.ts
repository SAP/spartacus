import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { getLocaleId } from '@angular/common';
import { LanguageService } from '../site-context/facade/language.service';
import { I18nConfig } from './config/i18n-config';

// type CxDatePipe, not DatePipe, due to conflict with Angular's DatePipe - problem occurs for the backward compatibility compiler of Ivy
@Pipe({ name: 'cxDate' })
export class CxDatePipe extends DatePipe implements PipeTransform {
  constructor(
    protected language: LanguageService,
    protected config: I18nConfig
  ) {
    super(null);
  }

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
    let result;
    this.language
      .getActive()
      .subscribe(lang => (result = lang))
      .unsubscribe();
    return result;
  }

  private reportMissingLocaleData(lang: string) {
    if (!this.config.production) {
      console.warn(
        `cxDate pipe: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}

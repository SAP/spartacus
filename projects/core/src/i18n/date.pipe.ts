import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NativeDatePipe } from '@angular/common';
import { getLocaleId } from '@angular/common';
import { LanguageService } from '../site-context/facade/language.service';
import { I18nConfig } from './config/i18n-config';

@Pipe({ name: 'cxDate' })
export class DatePipe extends NativeDatePipe implements PipeTransform {
  constructor(private language: LanguageService, private config: I18nConfig) {
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

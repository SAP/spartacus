import { DecimalPipe, getLocaleId } from '@angular/common';
import { isDevMode, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../site-context/facade/language.service';

Pipe({ name: 'cxDecimal' });
export class CxDecimalPipe extends DecimalPipe implements PipeTransform {
  constructor(protected language: LanguageService) {
    super(null);
  }

  transform(value: any, digitsInfo?: string): string | null {
    return super.transform(value, digitsInfo, this.getLang());
  }

  getLang() {
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
      .subscribe((lang) => (result = lang))
      .unsubscribe();
    return result;
  }

  private reportMissingLocaleData(lang: string) {
    if (isDevMode()) {
      console.warn(
        `cxDecimal pipe: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}

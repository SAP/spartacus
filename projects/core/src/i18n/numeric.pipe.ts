import { DecimalPipe, getLocaleId } from '@angular/common';
import { isDevMode, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../site-context/facade/language.service';

@Pipe({ name: 'cxNumeric' })
export class CxNumericPipe extends DecimalPipe implements PipeTransform {
  constructor(protected language: LanguageService) {
    super(null);
  }

  transform(value: any | number | string, digitsInfo?: string): string | null;
  transform(value: null | undefined, digitsInfo?: string): null;
  transform(value: any, digitsInfo?: string): string | null {
    return super.transform(value, digitsInfo, this.getLang());
  }

  protected getLang(): string {
    const lang = this.getActiveLang();
    try {
      getLocaleId(lang);
      return lang;
    } catch {
      this.reportMissingLocaleData(lang);
      return 'en';
    }
  }

  protected getActiveLang(): string {
    let result;
    this.language
      .getActive()
      .subscribe((lang) => (result = lang))
      .unsubscribe();
    return result;
  }

  protected reportMissingLocaleData(lang: string): void {
    if (isDevMode()) {
      console.warn(
        `cxNumeric pipe: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}

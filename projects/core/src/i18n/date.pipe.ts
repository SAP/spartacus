import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as NativeDatePipe } from '@angular/common';
import { getLocaleId } from '@angular/common';
import { LanguageService } from '../site-context/facade/language.service';

@Pipe({ name: 'cxDate' })
export class DatePipe extends NativeDatePipe implements PipeTransform {
  constructor(private language: LanguageService) {
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
      // fallback when active language is not registered via registerLocaleData (https://angular.io/api/common/registerLocaleData)
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
}

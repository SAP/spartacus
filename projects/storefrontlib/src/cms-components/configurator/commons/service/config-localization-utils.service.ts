import { getLocaleId } from '@angular/common';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigUtilsLocalizationService {
  constructor() {}

  public getLanguage(locale: string): string {
    try {
      getLocaleId(locale);
      return locale;
    } catch {
      this.reportMissingLocaleData(locale);
      return 'en';
    }
  }

  public reportMissingLocaleData(lang: string) {
    if (isDevMode()) {
      console.warn(
        `Config-Utils.service: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}

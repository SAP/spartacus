import { Injectable } from '@angular/core';
import { LanguageService, SiteContext } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Puts slash in between 2 letters of lang iso code
 */
export function languageToCustom(lang: string): string {
  return lang && lang.split('').join('/');
}

/**
 * Removes slash from between 2 letters and maps the result to lang iso code
 */
export function customToLanguage(custom: string): string {
  return custom && custom.replace('/', '');
}

@Injectable({ providedIn: 'root' })
export class CustomContextService implements SiteContext<string> {
  constructor(protected langService: LanguageService) {}

  getActive(): Observable<string> {
    return this.langService.getActive().pipe(map(languageToCustom));
  }

  setActive(custom: string): void {
    this.langService.setActive(customToLanguage(custom));
  }

  getAll(): Observable<string[]> {
    return this.langService
      .getAll()
      .pipe(
        map((languages) =>
          languages.map((lang) => languageToCustom(lang.isocode))
        )
      );
  }
}

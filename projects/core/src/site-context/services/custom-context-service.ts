import { SiteContext } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { LanguageService } from '../facade/language.service';

export function languageToCustom(lang: string): string {
  return lang && lang.toUpperCase();
}

export function custom2Language(country: string): string {
  if(country === 'HU')
    return 'ja';
  return country && country.toLowerCase();
}

@Injectable({ providedIn: 'root' })
export class CustomContextService implements SiteContext<string> {
  constructor(protected langService: LanguageService) {}

  getActive(): Observable<string> {
    return this.langService.getActive().pipe(map(languageToCustom), tap(language=>console.log("LAN:",language)));
  }

  setActive(country: string): void {
    this.langService.setActive(custom2Language(country));
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

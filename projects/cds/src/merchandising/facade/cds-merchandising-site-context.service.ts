import { Injectable } from '@angular/core';
import { BaseSiteService, LanguageService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MerchandisingSiteContext } from '../model/merchandising-site-context.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingSiteContextService {
  constructor(
    protected baseSiteService: BaseSiteService,
    protected languageService: LanguageService
  ) {}

  getSiteContext(): Observable<MerchandisingSiteContext> {
    return combineLatest([
      this.baseSiteService
        .getActive()
        .pipe(
          tap(result => console.log('baseSiteService.getActive - ', result))
        ),
      this.languageService
        .getActive()
        .pipe(
          tap(result => console.log('languageService.getActive - ', result))
        ),
    ]).pipe(
      map(([site, language]: [string, string]) => {
        const siteContext: MerchandisingSiteContext = {
          site,
          language,
        };
        return siteContext;
      })
    );
  }
}

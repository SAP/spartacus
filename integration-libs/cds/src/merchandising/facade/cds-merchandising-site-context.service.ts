import { Injectable } from '@angular/core';
import { BaseSiteService, LanguageService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      this.baseSiteService.getActive(),
      this.languageService.getActive(),
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

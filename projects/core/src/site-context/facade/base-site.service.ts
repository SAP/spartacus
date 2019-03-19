import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { SiteContext } from './site-context.interface';
import { OccConfig } from '../../occ/config/occ-config';

@Injectable({
  providedIn: 'root'
})
export class BaseSiteService implements SiteContext<string> {
  private baseSite: BehaviorSubject<string>;

  constructor(config: OccConfig) {
    this.baseSite = new BehaviorSubject<string>(config.site.baseSite);
  }

  getActive(): Observable<string> {
    return this.baseSite;
  }

  getAll(): Observable<string[]> {
    return of(['electronics-spa', 'apparel-de', 'apparel-uk']);
  }

  setActive(siteContext: string) {
    this.baseSite.next(siteContext);
  }
}

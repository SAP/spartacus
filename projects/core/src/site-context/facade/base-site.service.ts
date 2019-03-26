import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteContext } from './site-context.interface';
import { select, Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';
import { getActiveBaseSite } from '../store/selectors/base-site.selectors';
import { StateWithSiteContext } from '../store/state';
import { SetActiveBaseSite } from '../store/actions/base-site.action';

@Injectable()
export class BaseSiteService implements SiteContext<string> {
  constructor(private store: Store<StateWithSiteContext>) {}

  /**
   * Represents the current baseSite.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(getActiveBaseSite),
      tap(x => console.log('acti', x)),
      filter(Boolean)
    );
  }

  /**
   * We currently doesn't support switching baseSite at run time
   */
  getAll(): Observable<string[]> {
    return this.getActive().pipe(map(baseSite => [baseSite]));
  }

  setActive(siteContext: string) {
    console.log('sadsa', siteContext);
    this.store.dispatch(new SetActiveBaseSite(siteContext));
  }
}

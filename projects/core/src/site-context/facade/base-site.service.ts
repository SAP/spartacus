import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteContext } from './site-context.interface';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
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
      filter(Boolean)
    );
  }

  /**
   * We currently don't support switching baseSite at run time
   */
  getAll(): Observable<string[]> {
    return this.getActive().pipe(map(baseSite => [baseSite]));
  }

  setActive(baseSite: string) {
    return this.store
      .pipe(
        select(getActiveBaseSite),
        take(1)
      )
      .subscribe(activeBaseSite => {
        if (activeBaseSite !== baseSite) {
          this.store.dispatch(new SetActiveBaseSite(baseSite));
        }
      });
  }

  /**
   * Initializes the active baseSite.
   */
  initialize(defaultBaseSite: string) {
    this.setActive(defaultBaseSite);
  }
}

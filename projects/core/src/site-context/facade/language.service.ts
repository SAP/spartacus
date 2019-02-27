import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store/index';
import { filter, take, tap } from 'rxjs/operators';
import { Language } from '../../occ/occ-models';
import { WindowRef } from '../../window/window-ref';
import { SiteContext } from './site-context.interface';
/**
 * Facade that provides easy access to language state, actions and selectors.
 */
@Injectable()
export class LanguageService implements SiteContext<Language> {
  private sessionStorage: Storage;

  constructor(
    private store: Store<fromStore.StateWithSiteContext>,
    winRef: WindowRef
  ) {
    this.sessionStorage = winRef.sessionStorage;
  }

  /**
   * Represents all the languages supported by the current store.
   */
  getAll(): Observable<Language[]> {
    return this.store.pipe(
      select(fromStore.getAllLanguages),
      tap(languages => {
        if (!languages) {
          this.store.dispatch(new fromStore.LoadLanguages());
        }
      }),
      filter(Boolean)
    );
  }

  /**
   * Represents the isocode of the active language.
   */
  getActive(): Observable<string> {
    return this.store.pipe(
      select(fromStore.getActiveLanguage),
      filter(Boolean)
    );
  }

  /**
   * Sets the active language.
   */
  setActive(isocode: string) {
    return this.store
      .pipe(
        select(fromStore.getActiveLanguage),
        take(1)
      )
      .subscribe(activeLanguage => {
        if (activeLanguage !== isocode) {
          this.store.dispatch(new fromStore.SetActiveLanguage(isocode));
        }
      });
  }

  /**
   * Initials the active language. The active language is either given
   * by the last visit (stored in session storage) or by the
   * default session language of the store.
   */
  initialize(defaultLanguage: string) {
    if (this.sessionStorage && !!this.sessionStorage.getItem('language')) {
      this.setActive(this.sessionStorage.getItem('language'));
    } else {
      this.setActive(defaultLanguage);
    }
  }
}

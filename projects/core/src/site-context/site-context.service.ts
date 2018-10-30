import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyEntities, StateWithSiteContext } from './store/state';
import {
  getAllLanguages,
  LoadLanguages,
  getActiveLanguage
} from './store/index';

@Injectable()
export class SiteContextService {
  readonly languages$: Observable<CurrencyEntities> = this.store.pipe(
    select(getAllLanguages)
  );

  readonly activeLanguage$: Observable<string> = this.store.pipe(
    select(getActiveLanguage)
  );

  constructor(private store: Store<StateWithSiteContext>) {
    this.loadLanguages();
  }

  protected loadLanguages() {
    this.store.dispatch(new LoadLanguages());
  }
}

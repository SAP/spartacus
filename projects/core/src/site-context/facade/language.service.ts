import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OccConfig } from '../../occ/config/occ-config';

import { StateWithSiteContext, LanguagesEntities } from '../store/state';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';

@Injectable()
export class LanguageService {
  languages$: Observable<LanguagesEntities> = this.store.pipe(
    select(selectors.getAllLanguages)
  );

  activeLanguage$: Observable<string> = this.store.pipe(
    select(selectors.getActiveLanguage)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.loadAll();
    this.initSessionLanguage();
  }

  select(isocode: string) {
    this.store.dispatch(new actions.SetActiveLanguage(isocode));
  }

  protected loadAll() {
    this.store.dispatch(new actions.LoadLanguages());
  }

  protected initSessionLanguage() {
    if (sessionStorage && !!sessionStorage.getItem('language')) {
      this.select(sessionStorage.getItem('language'));
    } else {
      this.select(this.config.site.language);
    }
  }
}

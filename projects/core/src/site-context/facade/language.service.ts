import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { StateWithSiteContext } from '../store/state';
import { Language } from '../../occ-models/occ.models';
import {
  LoadLanguages,
  SetActiveLanguage
} from '../store/actions/languages.action';
import {
  getAllLanguages,
  getActiveLanguage
} from '../store/selectors/languages.selectors';
import { OccConfig } from '../../occ/config/occ-config';

@Injectable()
export class LanguageService {
  constructor(
    private store: Store<StateWithSiteContext>,
    private config: OccConfig
  ) {
    this.initActive();
    this.load();
  }

  get(): Observable<Language[]> {
    return this.store.pipe(select(getAllLanguages));
  }

  load(): void {
    this.store.dispatch(new LoadLanguages());
  }

  getActive(): Observable<string> {
    return this.store.pipe(select(getActiveLanguage));
  }

  setActive(isocode: string): void {
    this.store.dispatch(new SetActiveLanguage(isocode));
  }

  initActive(): void {
    if (sessionStorage) {
      const language = !sessionStorage.getItem('language')
        ? this.config.site.language
        : sessionStorage.getItem('language');

      this.setActive(language);
    } else {
      this.setActive(this.config.site.language);
    }
  }
}

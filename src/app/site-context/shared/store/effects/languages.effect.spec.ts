import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccSiteService } from '../../../../newocc/site-context/occ-site.service';
import { ConfigService } from '../../../../newocc/config.service';
import * as fromEffects from './languages.effect';
import * as fromActions from '../actions/languages.action';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Languages Effects', () => {
  let actions$: TestActions;
  let service: OccSiteService;
  let effects: fromEffects.LanguagesEffects;

  const data = {
    languages: [{ active: true, isocode: 'ja', name: 'Japanese' }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSiteService,
        ConfigService,
        fromEffects.LanguagesEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(OccSiteService);
    effects = TestBed.get(fromEffects.LanguagesEffects);

    spyOn(service, 'loadLanguages').and.returnValue(of(data));
  });

  describe('loadLanguages$', () => {
    it('should populate all languages from LoadLanguagesSuccess', () => {
      const action = new fromActions.LoadLanguages();
      const completion = new fromActions.LoadLanguagesSuccess(data.languages);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadLanguages$).toBeObservable(expected);
    });
  });
});

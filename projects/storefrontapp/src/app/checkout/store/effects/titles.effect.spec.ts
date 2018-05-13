import { TestBed } from '@angular/core/testing';
import { TitlesEffects } from '.';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable ,  of ,  EMPTY } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

@Injectable()
export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

class MockMiscsService {
  loadTitles() {}
}

const mockTitlesList = {
  titles: [
    {
      code: 'mr',
      name: 'Mr.'
    },
    {
      code: 'mrs',
      name: 'Mrs.'
    }
  ]
};

describe('Titles effect', () => {
  let service: OccMiscsService;
  let effect: TitlesEffects;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitlesEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    effect = TestBed.get(TitlesEffects);
    service = TestBed.get(OccMiscsService);
    actions$ = TestBed.get(Actions);

    spyOn(service, 'loadTitles').and.returnValue(of(mockTitlesList));
  });

  describe('loadTitles$', () => {
    it('should load the titles', () => {
      const action = new fromActions.LoadTitles();
      const completion = new fromActions.LoadTitlesSuccess(
        mockTitlesList.titles
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTitles$).toBeObservable(expected);
    });
  });
});

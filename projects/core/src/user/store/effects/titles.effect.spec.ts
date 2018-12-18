import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TitlesEffects } from '.';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import { TitleList } from '../../../occ/occ-models';

class MockMiscsService {
  loadTitles(): Observable<TitleList> {
    return of();
  }
}

const mockTitlesList: TitleList = {
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
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitlesEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(TitlesEffects);
    service = TestBed.get(OccMiscsService);

    spyOn(service, 'loadTitles').and.returnValue(of(mockTitlesList));
  });

  describe('loadTitles$', () => {
    it('should load the titles', () => {
      const action = new fromActions.LoadTitles();
      const completion = new fromActions.LoadTitlesSuccess(
        mockTitlesList.titles
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadTitles$).toBeObservable(expected);
    });
  });
});

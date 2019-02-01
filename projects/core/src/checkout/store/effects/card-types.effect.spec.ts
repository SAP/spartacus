import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions/index';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';
import { CardTypeList } from '../../../occ/occ-models/occ.models';

import { CardTypesEffects } from '.';

class MockMiscsService {
  loadCardTypes() {}
}

const mockCardTypesList: CardTypeList = {
  cardTypes: [
    {
      code: 'amex',
      name: 'American Express'
    },
    {
      code: 'maestro',
      name: 'Maestro'
    }
  ]
};

describe('Card Types effect', () => {
  let service: OccMiscsService;
  let effect: CardTypesEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardTypesEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(CardTypesEffects);
    service = TestBed.get(OccMiscsService);

    spyOn(service, 'loadCardTypes').and.returnValue(of(mockCardTypesList));
  });

  describe('loadCardTypes$', () => {
    it('should load the card types', () => {
      const action = new fromActions.LoadCardTypes();
      const completion = new fromActions.LoadCardTypesSuccess(
        mockCardTypesList.cardTypes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadCardTypes$).toBeObservable(expected);
    });
  });
});

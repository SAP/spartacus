import { TestBed } from '@angular/core/testing';
import { CardTypesEffects } from '.';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions/index';
import { OccMiscsService } from '@spartacus/core';
import { provideMockActions } from '@ngrx/effects/testing';

class MockMiscsService {
  loadCardTypes() {}
}

const mockCardTypesList = {
  cardTypes: [
    {
      code: 'amex',
      name: 'American Express'
    },
    {
      isocode: 'maestro',
      name: 'Maestro'
    }
  ]
};

describe('Card Types effect', () => {
  let service: OccMiscsService;
  let effect: CardTypesEffects;
  let actions$: Observable<any>;

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

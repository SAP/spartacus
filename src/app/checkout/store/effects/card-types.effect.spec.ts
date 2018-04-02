import { TestBed } from '@angular/core/testing';
import { CardTypesEffects } from '.';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccMiscsService } from '../../../occ/miscs/miscs.service';

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
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardTypesEffects,
        { provide: OccMiscsService, useClass: MockMiscsService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    effect = TestBed.get(CardTypesEffects);
    service = TestBed.get(OccMiscsService);
    actions$ = TestBed.get(Actions);

    spyOn(service, 'loadCardTypes').and.returnValue(of(mockCardTypesList));
  });

  describe('loadCardTypes$', () => {
    it('should load the card types', () => {
      const action = new fromActions.LoadCardTypes();
      const completion = new fromActions.LoadCardTypesSuccess(
        mockCardTypesList.cardTypes
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadCardTypes$).toBeObservable(expected);
    });
  });
});

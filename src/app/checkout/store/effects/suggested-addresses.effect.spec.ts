import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from './../actions';
import { OccUserService } from '../../../occ/user/user.service';
import { SuggestedAddressesEffects } from '.';

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

class MockUserService {
  loadSuggestedAddresses(userId, address) {}
}

const addresses = { suggestedAddresses: ['address1', 'address2'] };

describe('Suggested Addresses effect', () => {
  let service: OccUserService;
  let effect: SuggestedAddressesEffects;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SuggestedAddressesEffects,
        { provide: OccUserService, useClass: MockUserService },
        { provide: Actions, useFactory: getActions }
      ]
    });

    effect = TestBed.get(SuggestedAddressesEffects);
    service = TestBed.get(OccUserService);
    actions$ = TestBed.get(Actions);

    spyOn(service, 'loadSuggestedAddresses').and.returnValue(of(addresses));
  });

  describe('loadSuggestedAddresses$', () => {
    it('should load the suggested addresses', () => {
      const payload = {
        userId: 'userId',
        address: 'address'
      };
      const action = new fromActions.LoadSuggestedAddresses(payload);
      const completion = new fromActions.LoadSuggestedAddressesSuccess(
        addresses.suggestedAddresses
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadSuggestedAddresses$).toBeObservable(expected);
    });
  });
});

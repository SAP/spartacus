import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { AddressValidation } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import * as fromReducers from '../reducers/transitional';
import { StateWithUser, USER_FEATURE } from '../user-state';
import { UsersSelectors } from './index';

describe('Address Verification Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          USER_FEATURE,
          fromReducers.getReducersTransitional()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAddressVerificationResults', () => {
    it('should return all address verification results', () => {
      const addressValidation: AddressValidation = {
        decision: 'test address validation',
        suggestedAddresses: [{ id: 'address1' }],
      };

      let result: string | AddressValidation;
      store
        .pipe(select(UsersSelectors.getUserAddressVerificationResults))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new UserActions.VerifyUserAddressSuccess(addressValidation)
      );

      expect(result).toEqual(addressValidation);
    });
  });
});

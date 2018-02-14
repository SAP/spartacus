import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import * as fromRoot from './../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';
import { UserDetails } from '../../models/user-details.model';

const mockUserDetails: UserDetails = {
    displayUid: 'Display Uid',
    firstName: 'First',
    lastName: 'Last',
    name: 'First Last',
    type: 'Mock Type',
    uid: 'UID'
};

fdescribe('User Details Selectors', () => {
    let store: Store<fromReducers.UserState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    user: combineReducers(fromReducers.reducers)
                })
            ]
        });

        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
    });

    describe('getUserDetails', () => {
        it('should return a user details', () => {
            let result;
            store
                .select(fromSelectors.getUserDetails)
                .subscribe(value => (result = value));

            expect(result).toEqual({});

            store.dispatch(new fromActions.LoadUserDetailsSuccess(mockUserDetails));

            expect(result).toEqual(mockUserDetails);
        });
    });
});
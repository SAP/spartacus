import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import * as fromRoot from './../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';

const mockUserDetails = {
    name: 'mockName',
    password: 'mockPassword'
};

const mockEntities = {
    userDetails: mockUserDetails
}

const mockState = {
    entities: mockEntities
}

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

    describe('getUserDetailsState', () => {
        it('should return a user details from the state', () => {
            let result;
            store
                .select(fromSelectors.getUserDetailsState)
                .subscribe(value => (result = value));

            expect(result.entities.userDetails).toEqual({});

            store.dispatch(new fromActions.LoadUserDetailsSuccess(mockUserDetails));

            expect(result).toEqual(mockState);
        });
    });


    describe('getUserDetails', () => {
        it('should return a user details from the entities', () => {
            let result;
            store
                .select(fromSelectors.getUserDetails)
                .subscribe(value => (result = value));

            expect(result).toEqual({ userDetails: {} });

            store.dispatch(new fromActions.LoadUserDetailsSuccess(mockUserDetails));

            expect(result).toEqual(mockEntities);
        });
    });
});
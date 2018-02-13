import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import * as fromRoot from './../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';

fdescribe('User Selectors', () => {
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

    describe('getUserState', () => {
        it('should return a user from the state', () => {
            let result;
            store
                .select(fromSelectors.getUserState)
                .subscribe(value => (result = value));

            expect(result.entities.user).toEqual({});

            const mockUser = {
                name: 'mockName',
                password: 'mockPassword'
            };

            store.dispatch(new fromActions.LoadUserSuccess(mockUser));

            expect(result.entities.user).toEqual(mockUser);
        });
    });
});
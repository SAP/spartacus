import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccUserService } from '../../../newocc/user/user.service';
import { UserDetails } from '../../models/user-details.model';
import * as fromUserDetailsAction from '../actions/user-details.action';
import { UserDetailsEffects } from './';
import * as fromUserDetailsEffect from './user-details.effect';

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

class MockOccUserService {
    loadUser(username: string): Observable<any> {
        return;
    }
}

const mockUserDetails: UserDetails = {
    displayUid: 'Display Uid',
    firstName: 'First',
    lastName: 'Last',
    name: 'First Last',
    type: 'Mock Type',
    uid: 'UID'
};

fdescribe('User effect', () => {
    let userDetailsEffect: fromUserDetailsEffect.UserDetailsEffects;
    let userService: OccUserService;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                fromUserDetailsEffect.UserDetailsEffects,
                { provide: OccUserService, useClass: MockOccUserService },
                { provide: Actions, useFactory: getActions }
            ]
        });

        userDetailsEffect = TestBed.get(fromUserDetailsEffect.UserDetailsEffects);
        userService = TestBed.get(OccUserService);
        actions$ = TestBed.get(Actions);

        spyOn(userService, 'loadUser').and.returnValue(of(mockUserDetails));
    });

    describe('loadUserDetails$', () => {
        it('should load user details', () => {
            const action = new fromUserDetailsAction.LoadUserDetails(
                'mockName'
            );
            const completion = new fromUserDetailsAction.LoadUserDetailsSuccess(mockUserDetails);

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });

            expect(userDetailsEffect.loadUserDetails$).toBeObservable(expected);
        });
    });
});
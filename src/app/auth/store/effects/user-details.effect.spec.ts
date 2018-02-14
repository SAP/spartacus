import { TestBed } from '@angular/core/testing';
import { OccUserService } from '../../../newocc/user/user.service';
import { UserDetailsEffects } from './';
import { Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { hot, cold } from 'jasmine-marbles';

import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsEffect from './user-details.effect';
import { Injectable } from '@angular/core';

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

const mockUserDetails = {
    name: 'mockName',
    password: 'mockPassword'
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

            userDetailsEffect.loadUserDetails$
                .subscribe(userDetails =>
                    expect(userDetails).toBeObservable(expected));
        });
    });
});
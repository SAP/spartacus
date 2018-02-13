import { TestBed } from '@angular/core/testing';
import { OccUserService } from '../../../newocc/user/user.service';
import { UserEffects } from './';
import { Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { hot, cold } from 'jasmine-marbles';

import * as fromUserAction from '../actions/user.action';
import * as fromUserEffect from './user.effect';
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

const mockUser = {
    name: 'mockName',
    password: 'mockPassword'
};

fdescribe('User effect', () => {
    let userEffect: fromUserEffect.UserEffects;
    let userService: OccUserService;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                fromUserEffect.UserEffects,
                { provide: OccUserService, useClass: MockOccUserService },
                { provide: Actions, useFactory: getActions }
            ]
        });

        userEffect = TestBed.get(fromUserEffect.UserEffects);
        userService = TestBed.get(OccUserService);
        actions$ = TestBed.get(Actions);

        spyOn(userService, 'loadUser').and.returnValue(of(mockUser));
    });

    describe('loadUser$', () => {
        it('should load user', () => {
            const action = new fromUserAction.LoadUser(
                'mockName'
            );
            const completion = new fromUserAction.LoadUserSuccess(mockUser);

            actions$.stream = hot('-a', { a: action });
            const expected = cold('-b', { b: completion });

            userEffect.loadUser$
                .subscribe(user =>
                    expect(user).toBeObservable(expected));
        });
    });
});
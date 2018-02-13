import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError, mergeMap } from 'rxjs/operators';

import * as fromUserAction from '../actions/user.action';
import { OccUserService } from '../../../newocc/user/user.service';

@Injectable()
export class UserEffects {
    @Effect()
    loadUser$: Observable<any> = this.actions$
        .ofType(fromUserAction.LOAD_USER)
        .pipe(
            map((action: fromUserAction.LoadUser) => action.payload),
            mergeMap((username) => {
                return this.occUserService.loadUser(username).pipe(
                    map(user => {
                        return new fromUserAction.LoadUserSuccess({
                            user
                        });
                    }),
                    catchError(error =>
                        of(new fromUserAction.LoadUserFail(username))
                    )
                );
            })
        );

    constructor(
        private actions$: Actions,
        private occUserService: OccUserService,
    ) { }
}

import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions/user-register.action';
import * as fromTokenActions from '../actions/user-token.action';
import * as fromRouting from '../../../routing/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { OccUserService } from '../../../occ/user/user.service';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<any> = this.actions$
    .ofType(fromActions.REGISTER_USER)
    .pipe(
      map((action: fromActions.RegisterUser) => action.payload),
      mergeMap(({ firstName, lastName, password, titleCode, uid }) => {
        return this.userService
          .registerUser(firstName, lastName, password, titleCode, uid)
          .pipe(
            switchMap(user => [
              new fromTokenActions.LoadUserToken({
                userId: uid,
                password: password
              }),
              new fromRouting.Go({ path: [''] }),
              new fromActions.RegisterUserSuccess()
            ]),
            catchError(error => of(new fromActions.RegisterUserFail(error)))
          );
      })
    );

  constructor(private actions$: Actions, private userService: OccUserService) {}
}

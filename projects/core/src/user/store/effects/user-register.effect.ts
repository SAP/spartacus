import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions/user-register.action';
import { LoadUserToken } from '../../../auth/index';
import { UserRegisterFormData } from '../../../user/model/user.model';
import { OccUserService } from '../../../user/occ/index';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<
    fromActions.UserRegisterAction | LoadUserToken
  > = this.actions$.pipe(
    ofType(fromActions.REGISTER_USER),
    map((action: fromActions.RegisterUser) => action.payload),
    mergeMap((user: UserRegisterFormData) => {
      return this.userService.registerUser(user).pipe(
        switchMap(_result => [
          new LoadUserToken({
            userId: user.uid,
            password: user.password
          }),
          new fromActions.RegisterUserSuccess()
        ]),
        catchError(error => of(new fromActions.RegisterUserFail(error)))
      );
    })
  );

  constructor(private actions$: Actions, private userService: OccUserService) {}
}

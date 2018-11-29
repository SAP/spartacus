import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/user-register.action';

// todo: fix below import after auth store is moved to the core
import * as fromTokenActions from '../../../../../storefrontlib/src/lib/auth/store/actions';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { OccUserService } from '../../occ/user.service';
import { UserRegisterFormData } from '../../model/user.model';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.REGISTER_USER),
    map((action: fromActions.RegisterUser) => action.payload),
    mergeMap((user: UserRegisterFormData) => {
      return this.userService.registerUser(user).pipe(
        switchMap(_result => [
          new fromTokenActions.LoadUserToken({
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

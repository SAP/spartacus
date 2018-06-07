import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import * as fromActions from '../actions/user-register.action';
import * as fromTokenActions from '../actions/user-token.action';
import * as fromRouting from '../../../routing/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { OccUserService } from '../../../occ/user/user.service';
import { UserRegister } from '../../models/user.model';

@Injectable()
export class UserRegisterEffects {
  @Effect()
  registerUser$: Observable<any> = this.actions$
    .ofType(fromActions.REGISTER_USER)
    .pipe(
      map((action: fromActions.RegisterUser) => action.payload),
      mergeMap((user: UserRegister) => {
        return this.userService.registerUser(user).pipe(
          switchMap(_result => [
            new fromTokenActions.LoadUserToken({
              userId: user.uid,
              password: user.password
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

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  Command,
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CDCRegisterComponentService extends RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(
      ({ user }) =>
        new Observable<User>((userRegistered) => {
          // Registering user through CDC Gigya SDK
          if (user.firstName && user.lastName && user.uid && user.password) {
            this.cdcJSService.registerUserWithoutScreenSet(user).subscribe({
              next: (result) => {
                if (result.status === 'OK') {
                  userRegistered.complete();
                } else {
                  userRegistered.error(null);
                }
              },
              error: (error) => userRegistered.error(error),
            });
          }
        })
    );

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected command: CommandService,
    protected store: Store,
    protected cdcJSService: CdcJsService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(userRegisterFacade);
  }

  /**
   * Register a new user using CDC SDK.
   *
   * @param user as UserSignUp
   */
  register(user: UserSignUp): Observable<User> {
    return this.cdcJSService.didLoad().pipe(
      tap((cdcLoaded) => {
        if (!cdcLoaded) {
          this.globalMessageService.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          throwError('errorHandlers.scriptFailedToLoad');
        }
      }),
      switchMap(() =>
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })
      )
    );
  }
}

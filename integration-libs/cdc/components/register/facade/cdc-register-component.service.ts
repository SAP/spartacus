import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Command,
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
  UserActions
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterService } from '@spartacus/user/profile/core';
import { UserSignUp } from '@spartacus/user/profile/root';
import { CdcJsService } from 'integration-libs/cdc/root';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class CDCRegisterComponentService extends RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(
      ({ user }) =>
        new Observable<User>((userRegistered) => {
          // Registering user through CDC Gigya SDK
          if (user.firstName && user.lastName && user.uid && user.password) {
            this.cdcJSService.registerUserWithoutScreenSet(user);
          }
          this.store.dispatch(new UserActions.RegisterUserSuccess());
          userRegistered.complete();
        })
    );

  constructor(
    protected userRegisterService: UserRegisterService,
    protected command: CommandService,
    protected store: Store,
    protected cdcJSService: CdcJsService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(userRegisterService);
  }

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(user: UserSignUp): Observable<User> {
    return this.cdcJSService.didLoad().pipe(
      mergeMap((cdcLoaded: boolean) => {
        if (cdcLoaded) {
          // Logging in using CDC Gigya SDK, update the registerCommand
          return this.registerCommand.execute({ user });
        } else {
          // CDC Gigya SDK not loaded, show error
          this.globalMessageService.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return new Observable<User>(userNotRegistered => {
            userNotRegistered.complete();
          });
        }
      })
    );
  }
}

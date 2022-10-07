import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdcJsService, CdcLoginFailEvent } from '@spartacus/cdc/root';
import {
  AuthService,
  Command,
  CommandService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { RegisterComponentService } from '@spartacus/user/profile/components';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CDCRegisterComponentService extends RegisterComponentService {
  protected registerCommand: Command<{ user: UserSignUp }, User> =
    this.command.create(({ user }) =>
      // Registering user through CDC Gigya SDK
      this.cdcJSService.registerUserWithoutScreenSet(user)
    );

  protected loadUserTokenFailed$: Observable<boolean> = this.eventService
    .get(CdcLoginFailEvent)
    .pipe(
      map((event) => !event),
      tap((failed) => {
        if (failed) {
          throw new Error(`Token failed to load`);
        }
      })
    );

  constructor(
    protected userRegisterFacade: UserRegisterFacade,
    protected command: CommandService,
    protected store: Store,
    protected cdcJSService: CdcJsService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected eventService: EventService
  ) {
    super(userRegisterFacade, globalMessageService);
  }

  /**
   * Register a new user using CDC SDK.
   *
   * @param user as UserSignUp
   */
  register(user: UserSignUp): Observable<User> {
    if (!user.firstName || !user.lastName || !user.uid || !user.password) {
      return throwError(`The provided user is not valid: ${user}`);
    }

    return this.cdcJSService.didLoad().pipe(
      tap((cdcLoaded) => {
        if (!cdcLoaded) {
          this.globalMessageService.add(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          throw new Error(`CDC script didn't load.`);
        }
      }),
      withLatestFrom(this.loadUserTokenFailed$),
      switchMap(() =>
        // Logging in using CDC Gigya SDK, update the registerCommand
        this.registerCommand.execute({ user })
      )
    );
  }

  // @override
  postRegisterMessage(): void {
    // don't show the message
  }
}

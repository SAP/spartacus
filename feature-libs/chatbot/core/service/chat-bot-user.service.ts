import { Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotUserService {
  constructor(
    protected userAccount: UserAccountFacade,
    protected auth: AuthService
  ) {}

  user$ = this.auth.isUserLoggedIn().pipe(
    switchMap((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        return this.userAccount.get().pipe(filter((user) => !!user));
      } else {
        return of(undefined);
      }
    }),
    take(1)
  );
}

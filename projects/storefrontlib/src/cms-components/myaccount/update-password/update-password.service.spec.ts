import { NavigationExtras } from '@angular/router';
import { GlobalMessage, UrlCommands, User } from '@spartacus/core';
import { Observable, of } from 'rxjs';

class MockUserService {
  get(): Observable<User> {
    return of();
  }
  updatePassword(): void {}
  resetUpdatePasswordProcessState(): void {}
  getUpdatePasswordResultLoading(): Observable<boolean> {
    return of(true);
  }
  getUpdatePasswordResultSuccess(): Observable<boolean> {
    return of();
  }
}
class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

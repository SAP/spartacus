import { Injectable } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { UrlCommands } from '../../../../../core/src/routing/configurable-routes/url-translation';
import { NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Translatable } from '../../../../../core/src/i18n';

@Injectable({
  providedIn: 'any'
})

export class UpdateEmailService {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userService: UserService,
    protected authService: AuthService
  ) {
  }

  // RoutingService Wrappers
  goToRoute(commands: UrlCommands, query?: object, extras?: NavigationExtras): void {
    this.routingService.go(commands, query, extras);
  }

  // UserService Wrappers
  resetUpdateEmailResultState(): void {
    this.userService.resetUpdateEmailResultState();
  }

  updateEmail(password: string, newUid: string): void {
    this.userService.updateEmail(password, newUid);
  }

  getUpdateEmailResultLoading(): Observable<boolean> {
    return this.userService.getUpdateEmailResultLoading();
  }

  getUpdateEmailResultSuccess(): Observable<boolean> {
    return this.userService.getUpdateEmailResultSuccess();
  }

  // AuthService Wrappers
  logout(): Promise<any> {
    return this.authService.logout();
  }

  // GlobalMessageService Wrappers
  addGlobalMessage(text: string | Translatable, type: GlobalMessageType, timeout?: number): void {
    this.globalMessageService.add(text, type, timeout);
  }

}

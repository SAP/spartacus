import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const ROUTER_GO = '[Router] Go';
export const ROUTER_GO_BY_URL = '[Router] Go By Url';
export const ROUTER_BACK = '[Router] Back';
export const ROUTER_FORWARD = '[Router] Forward';

export class RouteGoAction implements Action {
  readonly type = ROUTER_GO;
  constructor(
    public payload: {
      path: string[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class RouteGoByUrlAction implements Action {
  readonly type = ROUTER_GO_BY_URL;
  constructor(public payload: string) {}
}

export class RouteBackAction implements Action {
  readonly type = ROUTER_BACK;
}

export class RouteForwardAction implements Action {
  readonly type = ROUTER_FORWARD;
}

export type RoutingAction =
  | RouteGoAction
  | RouteGoByUrlAction
  | RouteBackAction
  | RouteForwardAction;

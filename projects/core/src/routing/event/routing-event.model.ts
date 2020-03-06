import { BaseEvent } from '../../event/base-event.model';

export namespace RoutingEvents {
  export class Navigation extends BaseEvent<Navigation> {
    url: string;
  }

  export class NavigationSuccess extends BaseEvent<NavigationSuccess> {
    url: string;
  }

  export class NavigationCancel extends BaseEvent<NavigationCancel> {
    url: string;
  }
}

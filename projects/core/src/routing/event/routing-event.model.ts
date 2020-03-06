export namespace RoutingEvents {
  export class Navigation {
    url: string;
    constructor(data: Navigation) {
      Object.assign(this, data);
    }
  }

  export class NavigationSuccess {
    url: string;
    constructor(data: NavigationSuccess) {
      Object.assign(this, data);
    }
  }

  export class NavigationCancel {
    url: string;
    constructor(data: NavigationCancel) {
      Object.assign(this, data);
    }
  }
}

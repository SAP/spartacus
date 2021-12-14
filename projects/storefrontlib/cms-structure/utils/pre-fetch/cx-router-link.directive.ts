import { LocationStrategy } from '@angular/common';
import { Directive, Input, OnChanges, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLinkWithHref,
  UrlTree,
} from '@angular/router';

@Directive({
  selector: '[cxRouterLink]',
  exportAs: 'cxRouterLink',
})
export class CxRouterLinkDirective
  extends RouterLinkWithHref
  implements OnChanges, OnDestroy
{
  private cxCommands: any[] | null = null;
  private cxRouter: Router;
  private cxRoute: ActivatedRoute;

  constructor(
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy
  ) {
    super(router, route, locationStrategy);
    this.cxRouter = router;
    this.cxRoute = route;
  }

  // @override
  @Input()
  set cxRouterLink(commands: any[] | string | null | undefined) {
    if (commands != null) {
      this.cxCommands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.cxCommands = null;
    }
  }

  // @override
  get urlTree(): UrlTree {
    return this.cxRouter.createUrlTree(this.cxCommands ?? [], {
      // If the `relativeTo` input is not defined, we want to use `this.route` by default.
      // Otherwise, we should use the value provided by the user in the input.
      relativeTo:
        this.relativeTo !== undefined ? this.relativeTo : this.cxRoute,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment),
    });
  }
}

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}

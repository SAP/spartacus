import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

// probably should move to the component lib... (we can't include it in the module anyway)
@Injectable()
export abstract class AbstractPage {
  subscriptions = {};

  constructor(
    protected router: Router,
    protected activeRoute: ActivatedRoute
  ) {}

  loadAdditionData(params: Params) {
    // TODO
  }
}

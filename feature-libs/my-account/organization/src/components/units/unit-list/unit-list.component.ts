import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import {
  OrgUnitService,
  RoutingService,
  B2BUnitNode,
  SemanticPathService,
  RouterState,
} from '@spartacus/core';
import { NavigationNode } from '@spartacus/storefront';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUnitsListComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClass = BASE_CLASS;
  data$: Observable<NavigationNode>;

  subscription = new Subscription();
  lastPath$ = this.routingService.getRouterState().pipe(
    distinctUntilChanged(),
    map((state: RouterState) => state.state?.url.split('/').reverse()[0])
  );

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected semanticPathService: SemanticPathService,
    protected cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.orgUnitsService.loadTree();
    this.data$ = this.orgUnitsService.getTree().pipe(
      filter(Boolean),
      map((node) => this.toNavigation(node))
    );

    this.subscription.add(
      this.lastPath$.subscribe((path) => {
        this.hostClass = `${BASE_CLASS} ${path}`;
        // TODO: this should be refactored..
        this.cd.markForCheck();
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toNavigation(node: B2BUnitNode): NavigationNode {
    return {
      title: node.name,
      children: node.children.map((children) => this.toNavigation(children)),
      url: this.semanticPathService.transform({
        cxRoute: 'orgUnitDetails',
        params: { uid: node.id },
      }),
    };
  }
}

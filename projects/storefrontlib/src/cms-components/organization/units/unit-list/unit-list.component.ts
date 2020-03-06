import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  OrgUnitService,
  RoutingService,
  B2BUnitNode,
  SemanticPathService,
} from '@spartacus/core';
import { NavigationNode } from '../../../navigation/navigation/navigation-node.model';

@Component({
  selector: 'cx-unit-list',
  templateUrl: './unit-list.component.html',
})
export class ManageUnitsListComponent implements OnInit {
  cxRoute = 'orgUnits';
  data$: Observable<NavigationNode>;

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected semanticPathService: SemanticPathService
  ) {}

  ngOnInit(): void {
    this.orgUnitsService.loadTree();
    this.data$ = this.orgUnitsService.getTree().pipe(
      filter(Boolean),
      map(node => ({
        title: '',
        children: [this.toNavigation(node)],
      }))
    );
  }

  toNavigation(node: B2BUnitNode): NavigationNode {
    return {
      title: node.name,
      children: node.children.map(children => this.toNavigation(children)),
      url: this.semanticPathService.transform({
        cxRoute: 'orgUnitDetails',
        params: { uid: node.id },
      }),
    };
  }

  //   export interface NavigationNode {
  //   title?: string;
  //
  //   /** The url or route (parts) */
  //   url?: string | string[];
  //
  //   target?: string | boolean;
  //
  //   children?: Array<NavigationNode>;
  // }
}

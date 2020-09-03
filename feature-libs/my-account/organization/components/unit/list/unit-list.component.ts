import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { B2BUnitNode, SemanticPathService } from '@spartacus/core';
import { NavigationNode } from '@spartacus/storefront';
import { OrgUnitService } from '@spartacus/my-account/organization/core';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  @HostBinding('class') hostClass = BASE_CLASS;
  data$: Observable<NavigationNode> = this.orgUnitsService.getTree().pipe(
    filter(Boolean),
    map((node) => this.toNavigation(node))
  );

  constructor(
    protected orgUnitsService: OrgUnitService,
    protected semanticPathService: SemanticPathService
  ) {}

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

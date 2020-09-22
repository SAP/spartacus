import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { B2bUnitTreeNode } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationCellComponent } from '../../../shared/organization-table/organization-cell.component';
import { UnitListService } from '../../services/unit-list.service';

@Component({
  templateUrl: './toggle-link-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLinkCellComponent extends OrganizationCellComponent {
  @HostBinding('style.--cx-depth-level')
  get depthLevel() {
    return this.model.depthLevel;
  }

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected unitListService: UnitListService
  ) {
    super(outlet);
  }

  get tabIndex() {
    return 0;
  }

  get expanded() {
    return this.model.expanded;
  }

  get count() {
    return this.model.count;
  }

  toggleItem(event: Event) {
    event.preventDefault();
    this.unitListService.toggle((this.model as unknown) as B2bUnitTreeNode);
  }
}

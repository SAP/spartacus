import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { B2bUnitTreeNode } from '@spartacus/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationCellComponent } from '../../../shared/organization-table/organization-cell.component';
import { UnitTreeService } from '../../services/unit-tree.service';

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
    protected unitTreeService: UnitTreeService
  ) {
    super(outlet);
  }

  get tabIndex() {
    return 0;
  }

  get expanded() {
    return this.model.expanded;
  }

  get level() {
    return this.model.level;
  }

  /**
   * Counts the number of descendants
   */
  get count() {
    return this.model.count;
  }

  toggleItem(event: Event) {
    event.preventDefault();
    this.unitTreeService.toggle((this.model as unknown) as B2bUnitTreeNode);
  }

  /**
   * Indicates whether the tree item should have a toggle navigation.
   *
   * The toggle navigation is used in case the tree item has descendants,
   * and if the tree item level is not configured to be shown anyway.
   */
  get isSwitchable(): boolean {
    return this.count > 0;
  }
}

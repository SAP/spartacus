import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { B2BUnitTreeNode } from '@spartacus/organization/administration/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { CellComponent } from '../../../shared/table/cell.component';
import { UnitTreeService } from '../../services/unit-tree.service';

@Component({
  selector: 'cx-org-toggle-link-cell',
  templateUrl: './toggle-link-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLinkCellComponent extends CellComponent {
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

  get combinedName() {
    return this.property ? `${this.property} (${this.count})` : '';
  }

  get tabIndex() {
    return 0;
  }

  get expanded() {
    return this.model.expanded;
  }

  /**
   * Counts the number of descendants
   */
  get count() {
    return this.model.count;
  }

  toggleItem(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.unitTreeService.toggle(this.model as unknown as B2BUnitTreeNode);
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

  // TODO: leverage these methods when available from future PR.
  get hasItem(): boolean {
    return !!this.item && Object.keys(this.item).length > 0;
  }

  protected get item(): B2BUnit | null {
    if (!this.outlet.context) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
    return all as B2BUnit;
  }
}

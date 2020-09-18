import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { UnitListService } from '../../../unit/services/unit-list.service';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: './toggle-link-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLinkCellComponent extends OrganizationCellComponent {
  @HostBinding('style.--cx-nest-level')
  get nestLevel() {
    return this.model.depthLevel;
  }

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected uls: UnitListService
  ) {
    super(outlet);
  }

  get tabIndex() {
    return 1;
  }

  get expanded() {
    return this.model.expanded;
  }

  get level() {
    return this.model.level;
  }

  get count() {
    return this.model.count;
  }

  toggleItem(event: Event) {
    event.stopPropagation();
    this.uls.toggle(this.model.uid);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: '../organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountCellComponent extends OrganizationCellComponent {
  get property() {
    return this.budget + ' ' + this.currency;
  }

  protected get budget() {
    return this.model.budget;
  }

  protected get currency() {
    return this.model.currency?.isocode || this.model.currency;
  }
}

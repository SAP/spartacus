import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: '../organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountCellComponent extends OrganizationCellComponent {
  get property() {
    return this.model.budget + ' ' + this.model.currency;
  }
}

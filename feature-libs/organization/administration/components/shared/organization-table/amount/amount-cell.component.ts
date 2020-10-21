import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  templateUrl: '../organization-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountCellComponent extends OrganizationCellComponent {
  get property(): string {
    if (this.budget && this.currency) {
      return this.budget + ' ' + this.currency;
    }
    return;
  }

  protected get budget() {
    return this.model.budget;
  }

  protected get currency() {
    return this.model.currency?.isocode || this.model.currency;
  }
}

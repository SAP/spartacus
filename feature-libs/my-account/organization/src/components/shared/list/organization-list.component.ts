import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Table } from '@spartacus/storefront';

@Component({
  selector: 'cx-organization-list',
  templateUrl: './organization-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationListComponent {
  @Input() type: string;

  @Input() dataTable: Table;

  @Input() activeRow;

  constructor() {}

  view() {}
  sort() {}
}

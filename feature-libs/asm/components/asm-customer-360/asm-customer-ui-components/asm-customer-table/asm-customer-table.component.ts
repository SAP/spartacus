import { Component, Input } from '@angular/core';
import { TableFragment } from './asm-customer-table.model';

@Component({
  selector: 'cx-asm-customer-table',
  templateUrl: './asm-customer-table.component.html',
})
export class AsmCustomerTableComponent {
  @Input() fragment: TableFragment;
}

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import { TableHeaderOutletContext } from '../table.model';

@Component({
  selector: 'cx-table-data-cell',
  template: `{{ value }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  @HostBinding('attr.title')
  get value(): string {
    return this.model[this.field];
  }

  protected get model(): any {
    return this.outlet?.context;
  }

  protected get field(): string {
    return this.outlet?.context?._field;
  }
}

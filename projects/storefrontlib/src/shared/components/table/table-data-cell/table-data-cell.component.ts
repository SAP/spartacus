import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import { TableHeaderOutletContext } from '../table.model';

@Component({
  selector: 'cx-table-data-cell',
  template: `{{ value | async }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDataCellComponent {
  constructor(protected outlet: OutletContextData<TableHeaderOutletContext>) {}

  @HostBinding('attr.title')
  get value(): Observable<string> {
    return this.model?.pipe(map((context: any) => context[context?._field]));
  }

  protected get model(): Observable<any> {
    return this.outlet?.context$;
  }
}

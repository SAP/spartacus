import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-sub-list',
  templateUrl: './organization-sub-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationSubListComponent extends OrganizationListComponent {
  hostClass = '';

  @Input() previous: boolean | string = true;

  readonly dataTable$: Observable<Table> = this.currentKey$.pipe(
    switchMap((key) => this.service.getTable(key))
  );

  getRouteParam(): Observable<any> {
    return this.currentKey$.pipe(
      map((keyValue) => ({
        [this.key]: keyValue,
      }))
    );
  }
}

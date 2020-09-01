import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { OrganizationListComponent } from './organization-list.component';

@Component({
  selector: 'cx-organization-view',
  templateUrl: './organization-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationViewComponent extends OrganizationListComponent {
  hostClass = '';
  // getListCount(dataTable: Table) {
  //   return dataTable.data?.length;
  // }

  title$ = this.currentService.getTitle();

  getRouteParam(): Observable<any> {
    return this.currentKey$.pipe(
      map((keyValue) => ({
        [this.key]: keyValue,
      }))
    );
  }
}

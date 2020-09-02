import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-sub-list',
  templateUrl: './organization-sub-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationSubListComponent extends OrganizationListComponent {
  hostClass = '';

  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;

  getRouteParam(): Observable<any> {
    return this.currentKey$.pipe(
      map((keyValue) => ({
        [this.key]: keyValue,
      }))
    );
  }
}

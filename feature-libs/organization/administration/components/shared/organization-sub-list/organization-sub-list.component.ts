import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import { TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'cx-organization-sub-list',
  templateUrl: './organization-sub-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationSubListComponent extends OrganizationListComponent {
  hostClass = '';

  @Input() previous: boolean | string = true;

  @Input() key = this.service.key();

  @Input() set routerKey(key: string) {
    this.subKey$ = this.organizationItemService.getRouterParam(key);
  }

  @HostBinding('class.ghost') hasGhostData = false;

  subKey$: Observable<string>;

  readonly listData$: Observable<EntitiesModel<any>> = this.currentKey$.pipe(
    switchMap((key) => this.service.getData(key)),
    tap((data) => {
      this.hasGhostData = this.service.hasGhostData(data);
    })
  );

  readonly dataStructure$: Observable<
    TableStructure
  > = this.service.getStructure();
}

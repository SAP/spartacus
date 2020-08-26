import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { OrganizationListService } from './organization-list.service';

const BASE_CLASS = 'organization';

@Component({
  selector: 'cx-organization-list',
  templateUrl: './organization-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationListComponent<T = any, P = PaginationModel> {
  @HostBinding('class') hostClass = BASE_CLASS;

  constructor(
    protected service: OrganizationListService<T, P>,
    protected currentService: CurrentOrganizationItemService<T>
  ) {}

  readonly dataTable$: Observable<Table> = this.service.getTable();

  /**
   * The budget code for the selected budget. This is used to highlight the
   * active item in the list.
   */
  readonly currentKey$ = this.currentService.key$;

  /**
   * Browses to the given page number
   */
  browse(pagination: P, pageNumber: number) {
    this.service.view(pagination, pageNumber);
  }

  /**
   * Sorts the list.
   */
  sort(pagination: P) {
    this.service.sort(pagination);
  }
}

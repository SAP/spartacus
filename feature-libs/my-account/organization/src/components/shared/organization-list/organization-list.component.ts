import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../organization-item.service';
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
    protected organizationItemService: OrganizationItemService<T>
  ) {}

  get viewType() {
    return this.service.viewType;
  }

  /**
   * The current key represents the current selected item from the dataset.
   * This key is used to load the item details as well as highlight the item in
   * a list of items.
   */
  readonly currentKey$ = this.organizationItemService.key$;

  readonly dataTable$: Observable<Table> = this.service.getTable();

  notification$: Observable<string> = this.service.notification$;

  get key(): string {
    return this.service.key();
  }

  /**
   * Returns the total number of items.
   */
  getListCount(dataTable: Table): number {
    return dataTable.pagination?.totalResults;
  }

  /**
   * Browses to the given page number
   */
  browse(pagination: P, pageNumber: number) {
    this.service.view(pagination, pageNumber);
  }

  /**
   * Navigates to the detailed view of the selected list item.
   */
  launchItem(event: T): void {
    this.organizationItemService.launchDetails(event);
  }

  /**
   * Sorts the list.
   */
  sort(pagination: P): void {
    this.service.sort(pagination);
  }

  toggle(event: T): void {
    this.organizationItemService.toggle(event);
  }
}

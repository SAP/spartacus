import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  @Input() domainType: string;

  constructor(
    protected service: OrganizationListService<T, P>,
    protected currentService: CurrentOrganizationItemService<T>
  ) {}

  get viewType() {
    return this.service.viewType;
  }

  /**
   * The current key represents the current selected item from the dataset.
   * This key is used to load the item details as well as highlight the item in
   * a list of items.
   */
  readonly currentKey$ = this.currentService.key$;

  readonly dataTable$: Observable<Table> = this.currentKey$.pipe(
    switchMap((key) => this.service.getTable(key))
  );

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
    this.currentService.launchDetails(event);
  }

  /**
   * Sorts the list.
   */
  sort(pagination: P): void {
    this.service.sort(pagination);
  }
}

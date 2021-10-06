import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { Table, TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemService } from '../item.service';
import { OrganizationTableType } from '../organization.model';
import { ListService } from './list.service';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-org-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T = any, P = PaginationModel> {
  @HostBinding('class.ghost') hasGhostData = false;

  constructor(
    protected service: ListService<T, P>,
    protected organizationItemService: ItemService<T>
  ) {}

  @HostBinding('class')
  viewType: OrganizationTableType = this.service.viewType;

  domainType = this.service.domainType;

  sortCode: string;

  iconTypes = ICON_TYPE;

  /**
   * The current key represents the current selected item from the dataset.
   * This key is used to load the item details as well as highlight the item in
   * a list of items.
   */
  readonly currentKey$ = this.organizationItemService.key$;

  readonly structure$: Observable<TableStructure> = this.service.getStructure();

  readonly listData$: Observable<EntitiesModel<T>> = this.service
    .getData()
    .pipe(
      tap((data) => {
        this.sortCode = data.pagination?.sort;
        this.hasGhostData = this.service.hasGhostData(data);
      })
    );

  @Input() key = this.service.key();

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
    this.service.sort({
      ...pagination,
      ...({ sort: this.sortCode } as PaginationModel),
    });
  }
}

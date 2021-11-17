import { Injectable } from '@angular/core';
import { EntitiesModel } from '@spartacus/core';
import {
  ResponsiveTableConfiguration,
  TableLayout,
} from '@spartacus/storefront';
import { ListService } from '../list/list.service';
import { BaseItem } from '../organization.model';
import { Observable, of } from 'rxjs';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';

@Injectable()
export abstract class SubListService<
  T extends BaseItem
> extends ListService<T> {
  /**
   * The default table structure for sub lists is only showing tables with vertical layout.
   */
  protected defaultTableStructure: ResponsiveTableConfiguration = {
    options: { layout: TableLayout.VERTICAL },
  };

  /**
   * @override This sub list will show 3 items.
   */
  protected ghostData = { values: new Array(3) } as EntitiesModel<T>;

  // TODO: abstract
  assign?(_key: string, ..._args: any): Observable<OrganizationItemStatus<T>> {
    return of();
  }

  unassign?(
    _key: string,
    ..._args: any
  ): Observable<OrganizationItemStatus<T>> {
    return of();
  }

  /**
   * As we can't filter with the backend API, we do this client side.
   */
  protected filterSelected(list: EntitiesModel<T>): EntitiesModel<T> {
    if (!list) {
      return list;
    }

    const { pagination, sorts, values } = list;

    return {
      pagination,
      sorts,
      values: values.filter((value) => value.selected),
    };
  }
}

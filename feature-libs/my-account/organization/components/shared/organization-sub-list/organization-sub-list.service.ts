import { Injectable } from '@angular/core';
import {
  ResponsiveTableConfiguration,
  TableLayout,
} from '@spartacus/storefront';
import { OrganizationListService } from '../organization-list';

@Injectable()
export abstract class OrganizationSubListService<
  T
> extends OrganizationListService<T> {
  /**
   * The default table structure for sub lists is only showing tables with vertical layout.
   */
  protected defaultTableStructure: ResponsiveTableConfiguration = {
    options: { layout: TableLayout.VERTICAL },
  };

  // TODO: abstract
  assign(_key: string, _linkKey: string) {}
  unassign(_key: string, _linkKey: string) {}
}

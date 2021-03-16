import { PaginationModel, SortModel, User } from '../../model/misc.model';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export interface CustomerSearchPage {
  entries: User[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
export interface CustomerSearchOptions {
  query?: string;
  pageSize?: number;
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
export interface AsmUi {
  collapsed?: boolean;
}

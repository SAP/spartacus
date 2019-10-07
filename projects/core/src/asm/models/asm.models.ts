import { PaginationModel, SortModel, User } from '../../model/misc.model';

export interface CustomerSearchPage {
  entries: User[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface CustomerSearchOptions {
  query?: string;
}

export interface AsmUi {
  visible?: boolean;
}

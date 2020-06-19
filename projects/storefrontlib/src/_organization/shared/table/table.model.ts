import { PaginationModel, SortModel } from '@spartacus/core';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export interface Table {
  type: string;
  structure: TableStructure;
  data: any[];
  sorts?: SortModel[];
  pagination?: PaginationModel;
}

export interface TableStructure {
  breakpoint?: BREAKPOINT;
  labels: TableLabel[];
  hideLabels?: boolean;
}
export interface TableLabel {
  key: string;
  sortCode?: string;
}

export interface TableData {
  value: any;
  class?: string;
}

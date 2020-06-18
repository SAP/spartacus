import { PaginationModel, SortModel } from '@spartacus/core';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export type TableConfig = {
  structure: TableStructure;
  [BREAKPOINT.xs]?: TableStructure;
  [BREAKPOINT.sm]?: TableStructure;
  [BREAKPOINT.md]?: TableStructure;
  [BREAKPOINT.lg]?: TableStructure;
  [BREAKPOINT.xl]?: TableStructure;
};

export interface Table {
  type: string;
  structure: TableStructure;
  data: any[];
  sorts?: SortModel[];
  pagination?: PaginationModel;
}

export interface TableStructure {
  labels: TableLabel[];
  hideLabels?: boolean;
  // direction?: TableDirection;
}
export interface TableLabel {
  key: string;
  sortCode?: string;
}

export interface TableData {
  value: any;
  class?: string;
}

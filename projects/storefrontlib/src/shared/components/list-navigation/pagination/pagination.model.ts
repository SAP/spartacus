export interface PaginationItem {
  number?: number;

  isPrimary?: boolean;
  isCurrent?: boolean;
  isLast?: boolean;
  isFirst?: boolean;
  isGap?: boolean;
}

export enum PaginationItemType {
  FIRSTPAGE,
  LASTPAGE,
  PAGE,
  GAP,
}

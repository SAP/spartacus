export enum LoadStatus {
  SUCCESS,
  ERROR,
}

export interface OrganizationItemStatus<T> {
  status: LoadStatus | null;
  item: T | undefined;
}

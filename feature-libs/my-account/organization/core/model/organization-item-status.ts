export enum LoadStatus {
  SUCCESS,
  ERROR,
}

export interface OrganizationItemStatus<T> {
  status: LoadStatus;
  value: T;
}

//TODO: consider to make public LoaderState from core
interface LoaderState<T> {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  value?: T;
}

export function mapToItemInfo<T>(currentState: LoaderState<T>): OrganizationItemStatus<T> {
  return {
    status: currentState.success
      ? LoadStatus.SUCCESS
      : currentState.error
      ? LoadStatus.ERROR
      : null,
    value: currentState.value,
  };
}

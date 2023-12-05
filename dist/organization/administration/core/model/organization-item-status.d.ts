export declare enum LoadStatus {
    SUCCESS = 0,
    ERROR = 1
}
export interface OrganizationItemStatus<T> {
    status: LoadStatus | null;
    item: T | undefined;
}

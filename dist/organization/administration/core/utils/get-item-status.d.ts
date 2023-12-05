import { StateUtils } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationItemStatus } from '../model/organization-item-status';
export declare function getItemStatus<T>(itemState: Observable<StateUtils.LoaderState<T>>): Observable<OrganizationItemStatus<T>>;

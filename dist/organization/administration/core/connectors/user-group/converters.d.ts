import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';
export declare const USER_GROUP_NORMALIZER: InjectionToken<Converter<any, UserGroup>>;
export declare const USER_GROUP_SERIALIZER: InjectionToken<Converter<UserGroup, any>>;
export declare const USER_GROUPS_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<UserGroup>>>;

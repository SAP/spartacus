import { DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentUserGroupService } from './current-user-group.service';
import * as i0 from "@angular/core";
export declare class UserGroupRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentUserGroupService;
    constructor(translation: TranslationService, currentItemService: CurrentUserGroupService);
    protected getParams(): Observable<UserGroup | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupRoutePageMetaResolver>;
}

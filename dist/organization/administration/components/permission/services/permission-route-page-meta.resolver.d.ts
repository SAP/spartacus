import { DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentPermissionService } from './current-permission.service';
import * as i0 from "@angular/core";
export declare class PermissionRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentPermissionService;
    constructor(translation: TranslationService, currentItemService: CurrentPermissionService);
    protected getParams(): Observable<Permission | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionRoutePageMetaResolver>;
}

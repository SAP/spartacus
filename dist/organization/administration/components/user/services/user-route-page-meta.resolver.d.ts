import { B2BUser, DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';
import * as i0 from "@angular/core";
export declare class UserRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentUserService;
    constructor(translation: TranslationService, currentItemService: CurrentUserService);
    protected getParams(): Observable<B2BUser | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserRoutePageMetaResolver>;
}

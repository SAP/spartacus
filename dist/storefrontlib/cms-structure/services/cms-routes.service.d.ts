import { PageContext } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare abstract class CmsRoutesService {
    abstract handleCmsRoutesInGuard(pageContext: PageContext, componentTypes: string[], currentUrl: string, currentPageLabel: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsRoutesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsRoutesService>;
}

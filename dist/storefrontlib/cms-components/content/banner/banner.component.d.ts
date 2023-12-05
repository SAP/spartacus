import { CmsBannerComponent, CmsService, Image, ImageGroup, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import * as i0 from "@angular/core";
export declare class BannerComponent {
    protected component: CmsComponentData<CmsBannerComponent>;
    protected urlService: SemanticPathService;
    protected cmsService: CmsService;
    routerLink: string | any[] | undefined;
    styleClasses: string | undefined;
    data$: Observable<CmsBannerComponent>;
    constructor(component: CmsComponentData<CmsBannerComponent>, urlService: SemanticPathService, cmsService: CmsService);
    /**
     * Returns `_blank` to force opening the link in a new window whenever the
     * `data.external` flag is set to true.
     */
    getTarget(data: CmsBannerComponent): string | null;
    protected setRouterLink(data: CmsBannerComponent): void;
    getImage(data: CmsBannerComponent): Image | ImageGroup | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<BannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BannerComponent, "cx-banner", never, {}, {}, never, never, false, never>;
}

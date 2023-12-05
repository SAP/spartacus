import { Observable } from 'rxjs';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsStructureModel } from '../../model/page.model';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { CmsPageAdapter } from './cms-page.adapter';
import * as i0 from "@angular/core";
export declare class CmsPageConnector {
    protected cmsPageAdapter: CmsPageAdapter;
    protected cmsStructureConfigService: CmsStructureConfigService;
    constructor(cmsPageAdapter: CmsPageAdapter, cmsStructureConfigService: CmsStructureConfigService);
    /**
     * Returns an observable with the page structure. The page structure is
     * typically loaded from a backend, but can also be returned from static
     * configuration (see `CmsStructureConfigService`).
     */
    get(pageContext: PageContext): Observable<CmsStructureModel>;
    /**
     *
     * Merge default page structure to the given `CmsStructureModel`.
     * This is beneficial for a fast setup of the UI without necessary
     * fine-grained CMS setup.
     */
    private mergeDefaultPageStructure;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsPageConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsPageConnector>;
}

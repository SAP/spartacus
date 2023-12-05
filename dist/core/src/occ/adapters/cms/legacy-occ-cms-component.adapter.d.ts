import { Observable } from 'rxjs';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';
import * as i0 from "@angular/core";
/**
 * Before 1905, the OCC CMS component API required was using POST method
 * to load a (potentially large) number of components. With 1905, the endpoint
 * evaluated to use GET. Switching from POST to GET has been initially implemented
 * with the `legacy` flag, but from version 3.0 onwards, we're moving the
 * implementation to this optional Adapter.
 *
 * If you like to connect to a pre 1905 version, you can provide this adapter for the
 * `CmsComponentAdapter` injection token.
 */
export declare class LegacyOccCmsComponentAdapter extends OccCmsComponentAdapter {
    findComponentsByIds(ids: string[], pageContext: PageContext, fields?: string, currentPage?: number, pageSize?: number, sort?: string): Observable<CmsComponent[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LegacyOccCmsComponentAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LegacyOccCmsComponentAdapter>;
}

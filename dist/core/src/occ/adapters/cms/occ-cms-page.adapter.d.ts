import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CmsPageAdapter } from '../../../cms/connectors/page/cms-page.adapter';
import { CmsStructureModel } from '../../../cms/model/page.model';
import { PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing/models/page-context.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { UserIdService } from '../../../auth';
import { FeatureConfigService } from '../../../features-config';
import * as i0 from "@angular/core";
export interface OccCmsPageRequest {
    pageLabelOrId?: string;
    pageType?: PageType;
    code?: string;
    fields?: string;
}
export declare class OccCmsPageAdapter implements CmsPageAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected readonly userIdService: UserIdService;
    protected readonly featureConfigService: FeatureConfigService;
    protected headers: HttpHeaders;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    /**
     * @override returns the OCC CMS page data for the given context and converts
     * the data by any configured `CMS_PAGE_NORMALIZER`.
     */
    load(pageContext: PageContext): Observable<CmsStructureModel>;
    /**
     * The OCC CMS API allows to query pages by a combination of pageType, label and code.
     *
     * When a `ContentPage` is requested, we use the `pageLabelOrId`:
     *
     * ```
     * "/pages?pageLabelOrId=/my-page&pageType=ContentPage"
     * ```
     *
     * Other pages are queried by code:
     *
     * ```
     * "/pages?code=1234&pageType=ProductPage"
     * ```
     *
     * The page context is ignored for a home page request or in case of a
     * `smartedit-preview` request.
     */
    protected getPagesRequestParams(context: PageContext): OccCmsPageRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCmsPageAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCmsPageAdapter>;
}

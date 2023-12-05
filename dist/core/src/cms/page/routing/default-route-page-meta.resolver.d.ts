import { Observable } from 'rxjs';
import { TranslationService } from '../../../i18n/translation.service';
import { BreadcrumbMeta } from '../../model/page.model';
import { RouteBreadcrumbConfig, RouteBreadcrumbResolver, RouteBreadcrumbResolverParams } from './route-page-meta.model';
import * as i0 from "@angular/core";
/**
 * Resolves the breadcrumb for the Angular ActivatedRouteSnapshot
 */
export declare abstract class DefaultRoutePageMetaResolver implements RouteBreadcrumbResolver {
    protected translation: TranslationService;
    constructor(translation: TranslationService);
    /**
     * Resolves breadcrumb based on the given url and the breadcrumb config.
     *
     * - When breadcrumb config is empty, it returns an empty breadcrumb.
     * - When breadcrumb config is a string or object with `i18n` property,
     *    it translates it and use as a label of the returned breadcrumb.
     * - When breadcrumb config is an object with property `raw`, then
     *    it's used as a label of the returned breadcrumb.
     */
    resolveBreadcrumbs({ url, pageMetaConfig, }: RouteBreadcrumbResolverParams): Observable<BreadcrumbMeta[]>;
    /**
     * Translates the configured breadcrumb label
     */
    protected translateBreadcrumbLabel(breadcrumbConfig: string | RouteBreadcrumbConfig): Observable<string>;
    /**
     * Resolves dynamic data for the whole resolver.
     */
    protected getParams(): Observable<{
        [_: string]: any;
    } | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultRoutePageMetaResolver>;
}

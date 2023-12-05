import { Injector } from '@angular/core';
import { CmsSiteContextSelectorComponent, ContextServiceMap, SiteContext } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SiteContextType } from './site-context.model';
import * as i0 from "@angular/core";
export declare class SiteContextComponentService {
    protected componentData: CmsComponentData<CmsSiteContextSelectorComponent>;
    private contextServiceMap;
    protected injector: Injector;
    constructor(componentData: CmsComponentData<CmsSiteContextSelectorComponent>, contextServiceMap: ContextServiceMap, injector: Injector);
    getItems(context?: SiteContextType): Observable<any>;
    getActiveItem(context?: SiteContextType): Observable<string>;
    getLabel(context?: SiteContextType): Observable<any>;
    setActive(value: string, context?: SiteContextType): void;
    protected getService(context?: SiteContextType): Observable<SiteContext<any>>;
    protected getContext(context?: SiteContextType): Observable<string | undefined>;
    protected getInjectedService(context: string): SiteContext<any>;
    protected getOptionLabel(item: any, context?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextComponentService, [{ optional: true; }, null, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteContextComponentService>;
}

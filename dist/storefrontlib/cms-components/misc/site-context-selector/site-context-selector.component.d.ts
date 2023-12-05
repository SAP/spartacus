import { SiteContext } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextType } from './site-context.model';
import * as i0 from "@angular/core";
export declare class SiteContextSelectorComponent {
    private componentService;
    siteContextService: SiteContext<any>;
    iconTypes: typeof ICON_TYPE;
    /**
     * the context type can be set as an input. If the context is
     * not given, the context will be loaded from the backend.
     */
    context: SiteContextType;
    constructor(componentService: SiteContextComponentService);
    get items$(): Observable<any>;
    get activeItem$(): Observable<string>;
    set active(value: string);
    get label$(): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteContextSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SiteContextSelectorComponent, "cx-site-context-selector", never, { "context": "context"; }, {}, never, never, false, never>;
}

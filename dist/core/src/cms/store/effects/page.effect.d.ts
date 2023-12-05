import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { RoutingService } from '../../../routing/index';
import { CmsPageConnector } from '../../connectors/page/cms-page.connector';
import * as i0 from "@angular/core";
export declare class PageEffects {
    private actions$;
    private cmsPageConnector;
    private routingService;
    protected logger: LoggerService;
    refreshPage$: Observable<Action>;
    loadPageData$: Observable<Action>;
    constructor(actions$: Actions, cmsPageConnector: CmsPageConnector, routingService: RoutingService);
    static ɵfac: i0.ɵɵFactoryDeclaration<PageEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageEffects>;
}

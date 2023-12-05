import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class BaseSiteEffects {
    private actions$;
    private siteConnector;
    protected logger: LoggerService;
    loadBaseSite$: Observable<SiteContextActions.LoadBaseSiteSuccess | SiteContextActions.LoadBaseSiteFail>;
    loadBaseSites$: Observable<SiteContextActions.LoadBaseSitesSuccess | SiteContextActions.LoadBaseSitesFail>;
    constructor(actions$: Actions, siteConnector: SiteConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseSiteEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseSiteEffects>;
}

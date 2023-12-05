import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class RegionsEffects {
    private actions$;
    private siteConnector;
    protected logger: LoggerService;
    loadRegions$: Observable<UserActions.RegionsAction>;
    resetRegions$: Observable<Action>;
    constructor(actions$: Actions, siteConnector: SiteConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<RegionsEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RegionsEffects>;
}

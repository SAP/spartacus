import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import { StateWithSiteContext } from '../state';
import * as i0 from "@angular/core";
export declare class CurrenciesEffects {
    private actions$;
    private siteConnector;
    private state;
    protected logger: LoggerService;
    loadCurrencies$: Observable<SiteContextActions.LoadCurrenciesSuccess | SiteContextActions.LoadCurrenciesFail>;
    activateCurrency$: Observable<SiteContextActions.CurrencyChange>;
    constructor(actions$: Actions, siteConnector: SiteConnector, state: Store<StateWithSiteContext>);
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrenciesEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrenciesEffects>;
}

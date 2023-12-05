import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class BillingCountriesEffect {
    private actions$;
    private siteConnector;
    protected logger: LoggerService;
    loadBillingCountries$: Observable<UserActions.BillingCountriesAction>;
    constructor(actions$: Actions, siteConnector: SiteConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<BillingCountriesEffect, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BillingCountriesEffect>;
}

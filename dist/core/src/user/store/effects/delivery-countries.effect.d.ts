import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { UserActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class DeliveryCountriesEffects {
    private actions$;
    private siteConnector;
    protected logger: LoggerService;
    loadDeliveryCountries$: Observable<UserActions.DeliveryCountriesAction>;
    constructor(actions$: Actions, siteConnector: SiteConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<DeliveryCountriesEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DeliveryCountriesEffects>;
}

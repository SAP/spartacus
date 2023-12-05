import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { SiteConnector } from '../../connectors/site.connector';
import { SiteContextActions } from '../actions/index';
import { StateWithSiteContext } from '../state';
import * as i0 from "@angular/core";
export declare class LanguagesEffects {
    private actions$;
    private siteConnector;
    private state;
    protected logger: LoggerService;
    loadLanguages$: Observable<SiteContextActions.LoadLanguagesSuccess | SiteContextActions.LoadLanguagesFail>;
    activateLanguage$: Observable<SiteContextActions.LanguageChange>;
    constructor(actions$: Actions, siteConnector: SiteConnector, state: Store<StateWithSiteContext>);
    static ɵfac: i0.ɵɵFactoryDeclaration<LanguagesEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LanguagesEffects>;
}

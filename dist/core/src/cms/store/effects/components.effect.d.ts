import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { CmsComponent } from '../../../model/cms.model';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class ComponentsEffects {
    private actions$;
    private cmsComponentConnector;
    protected logger: LoggerService;
    constructor(actions$: Actions, cmsComponentConnector: CmsComponentConnector);
    private contextChange$;
    loadComponent$: (({ scheduler, debounce }?: any) => Observable<CmsActions.LoadCmsComponentSuccess<CmsComponent> | CmsActions.LoadCmsComponentFail>) & import("@ngrx/effects").CreateEffectMetadata;
    private loadComponentsEffect;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentsEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentsEffects>;
}

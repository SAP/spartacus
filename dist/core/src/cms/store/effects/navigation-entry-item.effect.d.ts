import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../logger';
import { RoutingService } from '../../../routing/index';
import { CmsComponentConnector } from '../../connectors/component/cms-component.connector';
import { CmsActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class NavigationEntryItemEffects {
    private actions$;
    private cmsComponentConnector;
    private routingService;
    protected logger: LoggerService;
    loadNavigationItems$: Observable<CmsActions.LoadCmsNavigationItemsSuccess | CmsActions.LoadCmsNavigationItemsFail>;
    getIdListByItemType(itemList: any[]): {
        pageIds: string[];
        componentIds: string[];
        mediaIds: string[];
    };
    constructor(actions$: Actions, cmsComponentConnector: CmsComponentConnector, routingService: RoutingService);
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationEntryItemEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NavigationEntryItemEffects>;
}

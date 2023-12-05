import { Observable } from 'rxjs';
import { CostCenter } from '../../../model/org-unit.model';
import { UserCostCenterAdapter } from './user-cost-center.adapter';
import { EntitiesModel } from '../../../model/misc.model';
import * as i0 from "@angular/core";
export declare class UserCostCenterConnector {
    protected adapter: UserCostCenterAdapter;
    constructor(adapter: UserCostCenterAdapter);
    getActiveList(userId: string): Observable<EntitiesModel<CostCenter>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserCostCenterConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserCostCenterConnector>;
}

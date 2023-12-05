import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Address } from '../../model/address.model';
import { CostCenter } from '../../model/org-unit.model';
import { StateWithUser } from '../store/user-state';
import * as i0 from "@angular/core";
export declare class UserCostCenterService {
    protected store: Store<StateWithUser>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithUser>, userIdService: UserIdService);
    /**
     * Load all visible active cost centers for the currently login user
     */
    loadActiveCostCenters(): void;
    private getCostCentersState;
    /**
     * Get all visible active cost centers
     */
    getActiveCostCenters(): Observable<CostCenter[]>;
    /**
     * Get the addresses of the cost center's unit based on cost center id
     * @param costCenterId cost center id
     */
    getCostCenterAddresses(costCenterId: string): Observable<Address[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserCostCenterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserCostCenterService>;
}

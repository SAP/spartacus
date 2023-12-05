import { UntypedFormGroup } from '@angular/forms';
import { CostCenter } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';
import * as i0 from "@angular/core";
export declare class UnitCostCenterItemService extends CostCenterItemService {
    save(form: UntypedFormGroup, key?: string): Observable<OrganizationItemStatus<CostCenter>>;
    /**
     * @override
     * Returns 'orgUnitCostCenters'
     */
    protected getDetailsRoute(): string;
    protected buildRouteParams(item: CostCenter): {
        uid: string | undefined;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitCostCenterItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitCostCenterItemService>;
}

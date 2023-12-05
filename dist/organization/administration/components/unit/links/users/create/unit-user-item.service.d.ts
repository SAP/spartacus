import { UntypedFormGroup } from '@angular/forms';
import { B2BUser } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { UserItemService } from '../../../../user/services/user-item.service';
import * as i0 from "@angular/core";
export declare class UnitUserItemService extends UserItemService {
    save(form: UntypedFormGroup, key?: string): Observable<OrganizationItemStatus<B2BUser>>;
    /**
     * @override
     * Returns 'unitDetails'
     */
    protected getDetailsRoute(): string;
    protected buildRouteParams(item: B2BUser): {
        uid: string | undefined;
    };
    launchDetails(item: B2BUser): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitUserItemService>;
}

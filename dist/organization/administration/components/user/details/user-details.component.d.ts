import { B2BUser } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { B2BUserService } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class UserDetailsComponent {
    protected itemService: ItemService<B2BUser>;
    protected b2bUserService: B2BUserService;
    userGuardSubscription: Subscription;
    model$: Observable<B2BUser>;
    isInEditMode$: Observable<boolean>;
    isUpdatingUserAllowed: boolean;
    availableRoles: string[];
    availableRights: string[];
    constructor(itemService: ItemService<B2BUser>, b2bUserService: B2BUserService);
    hasRight(model: B2BUser): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserDetailsComponent, "cx-org-user-details", never, {}, {}, never, never, false, never>;
}

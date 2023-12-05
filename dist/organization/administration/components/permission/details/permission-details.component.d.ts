import { Permission } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class PermissionDetailsComponent {
    protected itemService: ItemService<Permission>;
    model$: Observable<Permission>;
    isInEditMode$: Observable<boolean>;
    constructor(itemService: ItemService<Permission>);
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PermissionDetailsComponent, "cx-org-permission-details", never, {}, {}, never, never, false, never>;
}

import { UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
export declare class UserGroupDetailsComponent {
    protected itemService: ItemService<UserGroup>;
    model$: Observable<UserGroup>;
    isInEditMode$: Observable<boolean>;
    constructor(itemService: ItemService<UserGroup>);
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserGroupDetailsComponent, "cx-org-user-group-details", never, {}, {}, never, never, false, never>;
}

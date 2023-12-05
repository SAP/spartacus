import { Converter, Occ } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccUserGroupNormalizer implements Converter<Occ.OrgUnitUserGroup, UserGroup> {
    constructor();
    convert(source: Occ.OrgUnitUserGroup, target?: UserGroup): UserGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserGroupNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserGroupNormalizer>;
}

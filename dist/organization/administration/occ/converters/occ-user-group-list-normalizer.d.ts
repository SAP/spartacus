import { Converter, ConverterService, EntitiesModel, Occ } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccUserGroupListNormalizer implements Converter<Occ.OrgUnitUserGroupList, EntitiesModel<UserGroup>> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.OrgUnitUserGroupList, target?: EntitiesModel<UserGroup>): EntitiesModel<UserGroup>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserGroupListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserGroupListNormalizer>;
}

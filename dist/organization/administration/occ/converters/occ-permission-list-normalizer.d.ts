import { Converter, ConverterService, EntitiesModel, Occ } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccPermissionListNormalizer implements Converter<Occ.PermissionsList, EntitiesModel<Permission>> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.PermissionsList, target?: EntitiesModel<Permission>): EntitiesModel<Permission>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPermissionListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPermissionListNormalizer>;
}

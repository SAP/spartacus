import { Converter, Occ } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
export declare class OccPermissionNormalizer implements Converter<Occ.Permission, Permission> {
    convert(source: Occ.Permission, target?: Permission): Permission;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPermissionNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPermissionNormalizer>;
}

import { B2BUser, Converter, ConverterService, EntitiesModel, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccUserListNormalizer implements Converter<Occ.OrgUnitUserList, EntitiesModel<B2BUser>> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.OrgUnitUserList, target?: EntitiesModel<B2BUser>): EntitiesModel<B2BUser>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserListNormalizer>;
}

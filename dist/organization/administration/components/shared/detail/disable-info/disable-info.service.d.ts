import { B2BUnit } from '@spartacus/core';
import { BaseItem } from '../../organization.model';
import * as i0 from "@angular/core";
export declare class DisableInfoService<T extends BaseItem> {
    isItemDisabled(item: T): boolean;
    isParentDisabled(item: T): boolean;
    isRootUnit(item: B2BUnit): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisableInfoService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DisableInfoService<any>>;
}

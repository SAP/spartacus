import { B2BUnit } from '@spartacus/core';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export declare class UnitFormService extends FormService<B2BUnit> {
    protected patchData(item?: B2BUnit): void;
    protected build(): void;
    protected toggleParentUnit(item?: B2BUnit): void;
    protected isRootUnit(item: B2BUnit | undefined): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitFormService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitFormService>;
}
